'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    user.init({
        name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        document_type: DataTypes.STRING,
        document: DataTypes.STRING,
        nacionality: DataTypes.STRING,
        currency: DataTypes.STRING,
        unemployed: DataTypes.STRING,
        available: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        register_date: DataTypes.DATE,
        password: DataTypes.STRING,
        idPeople: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};