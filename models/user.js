'use strict';
const {
  Model
} = require('sequelize');

const { generateHash } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: 'UserId' })
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        args : true,
        msg : `This email has already been used`
      },
      validate : {
        notNull : {
          msg : `Email is required`
        },
        notEmpty : {
          msg : `Email is required`
        },
        isEmail : {
          msg : `Invalid email`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Password is required`
        },
        notEmpty : {
          msg : 'Password is required'
        },
        checkLength(value) {
          if(value.length < 6){
            throw new Error(`Minimum password length is 6 characters`)
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks : {
      beforeValidate: (user, options) => {
        if (!user.role) {
          user.role = "customer"
        }
      },
      beforeCreate : (user, options) => {
        user.password = generateHash(user.password)
      },
      afterCreate : (user, options) => {
        delete user.password
      }

    },
    sequelize,
    modelName: 'User',
  });
  return User;
};