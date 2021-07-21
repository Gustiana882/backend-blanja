/* eslint-disable max-len */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');
const product = require('./product');

class Bag {
  constructor() {
    this.table = sequelize.define('bags', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
    this.table.belongsTo(product.table, {
      foreignKey: 'product_id',
      as: 'product',
      onDelete: 'CASCADE',
    });
  }

  getAllBag(user) {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        where: { user },
        order: [['updatedAt', 'DESC']],
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getBagById(id) {
    return new Promise((resolve, reject) => {
      this.table.findByPk(id)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addBag(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateBag(data) {
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

  deleteBag(id) {
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

module.exports = new Bag();
