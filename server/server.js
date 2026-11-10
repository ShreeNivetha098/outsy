const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
