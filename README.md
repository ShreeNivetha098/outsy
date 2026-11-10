# Outsy – Coimbatore Day-Out Planner

Outsy builds personalised one-day outing plans in and around Coimbatore, based on where you start, your start and end times, your group, your budget in rupees and how you're travelling.

## Stack

- **Client:** React, React Router, Axios
- **Server:** Node.js, Express, MongoDB (Mongoose), JWT auth with bcrypt
- **Maps and routing (planned):** OpenStreetMap, Leaflet, OSRM

## Running locally

```bash
# install dependencies
npm --prefix server install
npm --prefix client install

# configure
cp server/.env.example server/.env   # then edit values
cp client/.env.example client/.env

# seed places into MongoDB
npm run seed

# start the API (port 5001) and the client (port 3000), in two terminals
npm run server
npm run client

# run server tests
npm test
```
