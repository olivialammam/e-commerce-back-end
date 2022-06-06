// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
const { NUMERIC } = require('sequelize/lib/data-types');
const dataTypes = require('sequelize/lib/dialects/postgres/data-types');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    price: {
      type: dataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      },
      category_id: {
        type: dataTypes.INTEGER,
        references: {
          model: 'category',
          key: 'id'
        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
