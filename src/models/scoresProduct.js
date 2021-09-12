/* eslint-disable max-len */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

class ScoreProduct {
  constructor() {
    this.table = sequelize.define('scores', {
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
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  }

  getScoreByIdProduct(idProduct) {
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

  addScore(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  deleteScore(id) {
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

module.exports = new ScoreProduct();
