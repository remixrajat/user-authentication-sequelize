module.exports = (sequelize, Sequelize) => {
  const Accesstoken = sequelize.define("Accesstoken", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    access_token: {
      type: Sequelize.STRING,
    },
    expiry: {
      type: Sequelize.FLOAT,
    },
  });
  return Accesstoken;
};
