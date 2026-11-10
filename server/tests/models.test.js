const Place = require("../models/Place");
const Plan = require("../models/Plan");
const places = require("../seed/data/places");
const { FOOD_CATEGORIES } = require("../config/constants");

// Returns Mongoose's per-field errors, or {} when the document is valid
const validationErrors = async (doc) => {
  try {
    await doc.validate();
    return {};
  } catch (error) {
    return error.errors;
  }
};

// Rough box around Coimbatore and the day-trip region (Ooty, Valparai, Sathy, Gobi)
const REGION = { minLat: 10.2, maxLat: 11.7, minLng: 76.5, maxLng: 77.4 };

const validPlace = (overrides = {}) => ({
  name: "Test Park",
  area: "Test Area",
  category: "park",
  ambience: ["family"],
  location: { type: "Point", coordinates: [76.96, 11.01] },
  visitMinutes: 60,
  ...overrides,
});

const validRequest = (overrides = {}) => ({
  start: { label: "Home", location: { type: "Point", coordinates: [76.96, 11.01] } },
  date: "2026-11-15",
  startTime: "08:00",
  endTime: "18:00",
  groupSize: 4,
  budget: 3000,
  transport: "car",
  ambience: "friends",
  foodPreference: "veg",
  ...overrides,
});

describe("seed data", () => {
  it.each(places.map((p) => [p.name, p]))("%s passes schema validation", async (_name, data) => {
    expect(await validationErrors(new Place(data))).toEqual({});
  });

  it("has unique names", async () => {
    const names = places.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("keeps every place inside the Coimbatore day-trip region", async () => {
    const outside = places.filter(({ location: { coordinates: [lng, lat] } }) =>
      lat < REGION.minLat || lat > REGION.maxLat || lng < REGION.minLng || lng > REGION.maxLng
    );
    expect(outside.map((p) => p.name)).toEqual([]);
  });

  it("gives every food stop a food type and meal cost", async () => {
    const missing = places.filter(
      (p) => FOOD_CATEGORIES.includes(p.category) && (!p.foodType || !p.avgMealCostPerPerson)
    );
    expect(missing.map((p) => p.name)).toEqual([]);
  });

  it("includes veg food stops", async () => {
    expect(places.some((p) => p.foodType === "veg")).toBe(true);
  });
});

describe("Place model", () => {
  it("accepts a minimal valid place and fills defaults", async () => {
    const place = new Place(validPlace());
    expect(await validationErrors(place)).toEqual({});
    expect(place.entryFeePerPerson).toBe(0);
    expect(place.interestScore).toBe(3);
    expect(place.verified).toBe(false);
  });

  it("rejects coordinates outside the valid range", async () => {
    const errors = await validationErrors(new Place(
      validPlace({ location: { type: "Point", coordinates: [200, 11] } })
    ));
    expect(errors["location.coordinates"]).toBeDefined();
  });

  it("requires a food type for restaurants", async () => {
    const errors = await validationErrors(new Place(validPlace({ category: "restaurant" })));
    expect(errors.foodType).toBeDefined();
  });

  it("rejects an opening window that closes before it opens", async () => {
    const errors = await validationErrors(new Place(
      validPlace({ openingHours: [{ days: ["mon"], open: "18:00", close: "09:00" }] })
    ));
    expect(errors["openingHours.0.close"]).toBeDefined();
  });

  it("rejects badly formatted times", async () => {
    const errors = await validationErrors(new Place(
      validPlace({ openingHours: [{ days: ["mon"], open: "9am", close: "17:00" }] })
    ));
    expect(errors["openingHours.0.open"]).toBeDefined();
  });

  it("requires at least one ambience", async () => {
    const errors = await validationErrors(new Place(validPlace({ ambience: [] })));
    expect(errors.ambience).toBeDefined();
  });

  it("declares a 2dsphere index on location", async () => {
    const indexes = Place.schema.indexes().map(([fields]) => fields);
    expect(indexes).toContainEqual({ location: "2dsphere" });
  });
});

describe("Plan model", () => {
  const userId = "507f1f77bcf86cd799439011";

  it("accepts a valid request with relaxed pace and auto meals by default", async () => {
    const plan = new Plan({ user: userId, request: validRequest() });
    expect(await validationErrors(plan)).toEqual({});
    expect(plan.request.pace).toBe("relaxed");
    expect(plan.request.meals.mode).toBe("auto");
  });

  it("rejects an end time before the start time", async () => {
    const errors = await validationErrors(new Plan({
      user: userId,
      request: validRequest({ startTime: "18:00", endTime: "08:00" }),
    }));
    expect(errors["request.endTime"]).toBeDefined();
  });

  it("rejects unknown transport, ambience and pace values", async () => {
    const errors = await validationErrors(new Plan({
      user: userId,
      request: validRequest({ transport: "helicopter", ambience: "solo", pace: "fast" }),
    }));
    expect(Object.keys(errors)).toEqual(
      expect.arrayContaining(["request.transport", "request.ambience", "request.pace"])
    );
  });

  it("rejects a group size of zero", async () => {
    const errors = await validationErrors(new Plan({ user: userId, request: validRequest({ groupSize: 0 }) }));
    expect(errors["request.groupSize"]).toBeDefined();
  });

  it("stores itinerary stops with legs", async () => {
    const plan = new Plan({
      user: userId,
      request: validRequest(),
      itinerary: {
        stops: [
          { kind: "start", name: "Home", location: { type: "Point", coordinates: [76.96, 11.01] }, departAt: "08:00" },
          {
            kind: "meal",
            meal: "breakfast",
            name: "Shree Anandhaas",
            location: { type: "Point", coordinates: [76.9667, 11.0172] },
            arriveAt: "08:20",
            departAt: "09:05",
            stayMinutes: 45,
            cost: 800,
            leg: { distanceKm: 3.2, minutes: 20, cost: 25 },
          },
        ],
      },
    });
    expect(await validationErrors(plan)).toEqual({});
    expect(plan.itinerary.stops[1].leg.distanceKm).toBe(3.2);
  });
});
