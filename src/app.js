const express = require('express');
const sequelize = require('./utils/connection');
const app = require('./server');
require('dotenv').config();

const PORT = process.env.PORT;

const main = async () => {
  try {
      sequelize.sync(); //{alter: true}
      console.log("DB connected");
      app.listen(PORT);
      console.log(`Server running on port ${PORT}`);
      console.log(`Link http://localhost:${PORT}`);
  } catch (error) {
      console.log(error)
  }
}

main();