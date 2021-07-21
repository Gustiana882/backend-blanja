const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

class Auth {
  constructor() {
    this.table = sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      roles: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.table.findOne({
        where: {
          email,
        },
      }).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Auth();
