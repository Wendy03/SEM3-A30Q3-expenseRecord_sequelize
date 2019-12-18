'use strict';
const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    date: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('date')).format('YYYY-MM-DD')
      }
    },
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    merchant: DataTypes.STRING
  }, {});
  Record.associate = function (models) {
    // associations can be defined here
    Record.belongsTo(models.User)
  };
  return Record;
};