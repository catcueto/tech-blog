const { Model, DataTypes } = require("sequelize");
const bycrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  // adding security to pws
  checkPassword(loginPassword) {
    return bycrypt.compare(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password must be at least 8 characters long
        leng: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // hash to turn pw into a string of letters and numbers using an encryption algorithm to prevent pw leak
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;
