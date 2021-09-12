const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

class Customer {
  constructor() {
    this.table = sequelize.define('customers', {
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
      phone: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      dateBirth: {
        type: DataTypes.STRING(128),
        allowNull: true,
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

  getCustomerByEmail(email) {
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

module.exports = new Customer();
