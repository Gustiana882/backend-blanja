/* eslint-disable max-len */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

class Address {
  constructor() {
    this.table = sequelize.define('address', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      nameLocation: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      recipient: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      recipientPhone: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posCode: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
  }

  getAddressBySeller(name) {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        where: {
          name,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addAddress(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateAddress(data) {
    return new Promise((resolve, reject) => {
      this.table.update(data, {
        where: {
          id: data.id,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  deleteAddress(id) {
    return new Promise((resolve, reject) => {
      this.table.destroy({
        where: {
          id,
        },
      }).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Address();
