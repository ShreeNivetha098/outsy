# Outsy – Coimbatore Day-Out Planner

Outsy builds personalised one-day outing plans in and around Coimbatore, based on where you start, your start and end times, your group, your budget in rupees and how you're travelling.

## Stack

- **Client:** React, React Router, Axios
- **Server:** Node.js, Express, MongoDB (Mongoose), JWT auth with bcrypt
- **Maps and routing (planned):** OpenStreetMap, Leaflet, OSRM

## Running locally

```bash
# install dependencies
npm install            # root (server dependencies)
cd client && npm install

# configure the server
cp server/.env.example server/.env   # then edit values

# seed places into MongoDB
node server/seed/seedPlaces.js

# start the API (port 5001)
cd server && npm run dev

# start the client (port 3000)
cd client && npm start
```
