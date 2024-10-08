const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Genre = sequelize.define('genres', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Genre;