const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hospital_management_system', 'root', '', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error:', err));

module.exports = sequelize;
