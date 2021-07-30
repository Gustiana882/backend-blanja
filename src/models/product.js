/* eslint-disable max-len */
const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../configs/db');
const category = require('./category');

class Product {
  constructor() {
    this.table = sequelize.define('products', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
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
      review: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
    this.table.belongsTo(category.table, {
      foreignKey: 'category_id',
      as: 'categories',
      onDelete: 'CASCADE',
    });
  }

  getAllProduct(column = 'updatedAt', short = 'DESC') {
    return new Promise((resolve, reject) => {
      this.table.findAll({
        include: [{
          model: category.table,
          as: 'categories',
          attributes: ['name', 'id'],
        }],
        attributes: { exclude: ['category_id'] },
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
          title: name,
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
              title: {
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
