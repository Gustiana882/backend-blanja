/* eslint-disable max-len */
const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../configs/db');
const category = require('./category');
const score = require('./scoresProduct');
const stock = require('./stockProduct');

class Product {
  constructor() {
    this.table = sequelize.define('products', {
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
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      condition: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      id_user: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
    this.table.belongsTo(category.table, {
      foreignKey: 'category_id',
      as: 'categories',
      onDelete: 'CASCADE',
    });
    this.table.hasMany(score.table, {
      foreignKey: 'id_product',
      onDelete: 'CASCADE',
    });
    this.table.hasMany(stock.table, {
      foreignKey: 'id_product',
      onDelete: 'CASCADE',
    });
  }

  getAllMyProduct(idUser) {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        include: [
          {
            model: category.table,
            as: 'categories',
          },
          {
            model: score.table,
          },
          {
            model: stock.table,
          },
        ],
        where: {
          id_user: idUser,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getAllProduct(column = 'updatedAt', short = 'DESC') {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        include: [
          {
            model: category.table,
            as: 'categories',
          },
          {
            model: score.table,
          },
          {
            model: stock.table,
          },
        ],
        order: [[column, short]],
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      this.table.findByPk(id, {
        include: [{
          model: category.table,
          as: 'categories',
          attributes: ['name', 'id'],
        }],
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getProductByName(name) {
    return new Promise((resolve, reject) => {
      this.table.findOne({
        include: [{
          model: category.table,
          as: 'categories',
          attributes: ['name', 'id'],
        }],
        where: {
          name,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addProduct(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateProduct(data) {
    return new Promise((resolve, reject) => {
      this.table.update(data, {
        where: {
          id: data.id_product,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      this.table.destroy({
        where: {
          id,
        },
      }).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  searchProduct(key) {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${key}%`,
              },
            },
            {
              brand: {
                [Op.like]: `%${key}%`,
              },
            },
          ],
        },
      }).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Product();
