const mongoose = require("mongoose");
const Place = require("../models/Place");

mongoose.connect("mongodb://localhost:27017/outsy");

const places = [
  {
    name: "Brookefields Mall",
    area: "RS Puram",
    category: "mall",
    budgetLevel: 2,
    ambience: ["family", "friends", "couple"],
    avgTimeSpent: 2,
    latitude: 11.0168,
    longitude: 76.9558,
  },
  {
    name: "VOC Park",
    area: "Gandhipuram",
    category: "park",
    budgetLevel: 1,
    ambience: ["family", "girls"],
    avgTimeSpent: 1.5,
    latitude: 11.0160,
    longitude: 76.9650,
  },
  {
    name: "Black Thunder",
    area: "Mettupalayam",
    category: "adventure",
    budgetLevel: 3,
    ambience: ["friends", "boys", "girls"],
    avgTimeSpent: 4,
    latitude: 11.3000,
    longitude: 76.9500,
  },
  {
    name: "Kovai Kutralam",
    area: "Siruvani Road",
    category: "nature",
    budgetLevel: 1,
    ambience: ["friends", "family", "boys", "girls"],
    avgTimeSpent: 3,
    latitude: 10.9854,
    longitude: 76.8077,
  },

  {
    name: "Prozone Mall",
    area: "Saravanampatti",
    category: "mall",
    budgetLevel: 2,
    ambience: ["family", "friends", "couple", "girls"],
    avgTimeSpent: 2,
    latitude: 11.0807,
    longitude: 76.9986,
  },

  {
    name: "Marudhamalai Temple",
    area: "Marudhamalai",
    category: "temple",
    budgetLevel: 1,
    ambience: ["family", "girls", "boys"],
    avgTimeSpent: 1.5,
    latitude: 11.0778,
    longitude: 76.8630,
  },

  {
    name: "Perur Pateeswarar Temple",
    area: "Perur",
    category: "temple",
    budgetLevel: 1,
    ambience: ["family", "girls", "boys"],
    avgTimeSpent: 1.5,
    latitude: 10.9760,
    longitude: 76.9120,
  },

  {
    name: "Koniamman Temple",
    area: "Town Hall",
    category: "temple",
    budgetLevel: 1,
    ambience: ["family", "girls"],
    avgTimeSpent: 1,
    latitude: 11.0000,
    longitude: 76.9660,
  },

  {
    name: "Red Door Cafe",
    area: "RS Puram",
    category: "cafe",
    budgetLevel: 2,
    ambience: ["friends", "couple", "girls"],
    avgTimeSpent: 1.5,
    latitude: 11.0089,
    longitude: 76.9515,
  },

  {
    name: "Sazz Multi Cuisine Restaurant",
    area: "Gandhipuram",
    category: "restaurant",
    budgetLevel: 2,
    ambience: ["family", "friends"],
    avgTimeSpent: 1.5,
    latitude: 11.0174,
    longitude: 76.9675,
  },

  {
    name: "Valarmathi Mess",
    area: "RaceCourse",
    category: "restaurant",
    budgetLevel: 1,
    ambience: ["family", "boys"],
    avgTimeSpent: 1,
    latitude: 11.0190,
    longitude: 76.9655,
  },

  {
    name: "Siruvani Falls",
    area: "Siruvani",
    category: "nature",
    budgetLevel: 1,
    ambience: ["friends", "family", "boys", "girls"],
    avgTimeSpent: 3,
    latitude: 10.9820,
    longitude: 76.8090,
  },

  {
    name: "Bhavanisagar Dam",
    area: "Bhavanisagar",
    category: "nature",
    budgetLevel: 1,
    ambience: ["family", "friends"],
    avgTimeSpent: 2.5,
    latitude: 11.4850,
    longitude: 77.0000,
  },

  {
    name: "Bannari Amman Temple",
    area: "Sathyamangalam Road",
    category: "temple",
    budgetLevel: 1,
    ambience: ["family"],
    avgTimeSpent: 1.5,
    latitude: 11.5730,
    longitude: 77.1190,
  },

  {
    name: "Ooty",
    area: "Ooty",
    category: "nature",
    budgetLevel: 3,
    ambience: ["family", "friends", "couple", "girls", "boys"],
    avgTimeSpent: 6,
    latitude: 11.4064,
    longitude: 76.6932,
  },

  {
    name: "Anaikatti",
    area: "Anaikatti",
    category: "nature",
    budgetLevel: 2,
    ambience: ["friends", "couple"],
    avgTimeSpent: 3,
    latitude: 11.1235,
    longitude: 76.7850,
  },

  {
    name: "Havana",
    area: "RS Puram",
    category: "cafe",
    budgetLevel: 2,
    ambience: ["friends", "couple", "girls"],
    avgTimeSpent: 1.5,
    latitude: 11.0100,
    longitude: 76.9520,
  },

  {
    name: "Delhiwala",
    area: "RS Puram",
    category: "restaurant",
    budgetLevel: 2,
    ambience: ["family", "friends"],
    avgTimeSpent: 1.5,
    latitude: 11.0095,
    longitude: 76.9510,
  },

];

async function seedData() {
  try {
    await Place.deleteMany();
    await Place.insertMany(places);
    console.log("Data seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

seedData();