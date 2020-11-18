'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, { foreignKey: 'ProductId' })
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Name is required`
        },
        notNull : {
          msg : `Name is required`
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Image Url is required`
        },
        notNull : {
          msg : `Image Url is required`
        },
        // isUrl : true
        isUrl : {
          args : true,
          msg : `Image Url is invalid`
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Price is required`
        },
        notEmpty : {
          msg : `Price is required`
        },
        isInt : {
          msg : `Please insert number`
        },
        min : {
          args : [0],
          msg : `Price must be greater than 0`
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Stock is required`
        },
        notEmpty : {
          msg : `Stock is required`
        },
        isInt : {
          msg : `Please insert number`
        },
        min : {
          args : [0],
          msg : `Stock must be greater than 0`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};