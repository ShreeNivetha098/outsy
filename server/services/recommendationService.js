const Place = require("../models/Place");

const generatePlan = async ({ hoursAvailable, budgetLevel, ambience }) => {
  try {
    // 1️⃣ Fetch places matching budget + ambience
    const filteredPlaces = await Place.find({
      budgetLevel: { $lte: budgetLevel },
      ambience: { $in: [ambience] },
    });

    if (!filteredPlaces.length) {
      return {
        message: "No places found for given preferences",
        places: [],
        totalHoursUsed: 0,
      };
    }

    let totalHoursUsed = 0;
    let selectedPlaces = [];
    let lastArea = null;

    // 2️⃣ Sort by avgTimeSpent (small to large)
    filteredPlaces.sort((a, b) => a.avgTimeSpent - b.avgTimeSpent);

    // 3️⃣ Loop and build plan
    for (let place of filteredPlaces) {
      let travelTime = 0;

      if (lastArea && lastArea !== place.area) {
        travelTime = 0.75; // 45 mins if different area
      } else if (lastArea && lastArea === place.area) {
        travelTime = 0.25; // 15 mins same area
      }

      const totalTimeForThisPlace = place.avgTimeSpent + travelTime;

      if (totalHoursUsed + totalTimeForThisPlace <= hoursAvailable) {
        selectedPlaces.push({
          name: place.name,
          area: place.area,
          category: place.category,
          timeSpent: place.avgTimeSpent,
          travelTime,
        });

        totalHoursUsed += totalTimeForThisPlace;
        lastArea = place.area;
      }
    }

    return {
      totalHoursUsed,
      places: selectedPlaces,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { generatePlan };