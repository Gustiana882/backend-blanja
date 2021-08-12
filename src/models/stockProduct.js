/* eslint-disable max-len */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

class StockProduct {
  constructor() {
    this.table = sequelize.define('stocks', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }

  getStockByIdProduct(idProduct) {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        where: {
          id_product: idProduct,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addStock(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  deleteStock(id) {
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

module.exports = new StockProduct();
