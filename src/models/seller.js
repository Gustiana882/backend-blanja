const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

class Seller {
  constructor() {
    this.table = sequelize.define('sellers', {
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
      store: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
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

  getSellerByEmail(email) {
    return new Promise((resolve, reject) => {
      this.table.findOne({
        where: {
          email,
        },
      }).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateProfile(data) {
    return new Promise((resolve, reject) => {
      this.table.update(data, {
        where: {
          email: data.email,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      this.table.update(data, {
        where: {
          email: data.email,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Seller();
