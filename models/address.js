module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("Address", {
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    pincode: {
      type: Sequelize.INTEGER,
    },
    phoneno: {
      type: Sequelize.STRING,
    },
  });
  return Address;
};