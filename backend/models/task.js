const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    defaultValue: 'To Do',
  },
  user_id: DataTypes.INTEGER,
});

module.exports = Task;
