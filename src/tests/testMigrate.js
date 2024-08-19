const sequelize = require('../utils/connection');
require('../models')

const testMigrate = async () => {
  try {
      await sequelize.sync({force: true}); //{alter: true}
      console.log("DB reset ✅");
      process.exit()
  } catch (error) {
      console.log(error)
  }
}

testMigrate();