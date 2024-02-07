const sequelize = require('../helper/database');
const Sequelize = require('sequelize');
const path = require('path');

const createTable = (TN, FN, FT) => {
  const tableFields = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  };

  for (let i = 0; i < FN.length; i++) {
    tableFields[FN[i]] = {
      type: Sequelize[FT[i]],
      allowNull: false
    };
  }

  const Table = sequelize.define(TN, tableFields);
  return Table;
};
const getTableValues = (tableName) => {
  // Replace 'tableName' with the actual name of your table.
  return sequelize.query(`SELECT * FROM ${tableName}`)
    .then(([results, metadata]) => {
      // Assuming 'results' contains the data rows.
      return results;
    });
}

const getTablefields = (tableName) => {
  return sequelize.query(`DESCRIBE ${tableName}`)
    .then(([results]) => { // Destructure the results directly.
      const fields = results.map(result => result.Field);
      return fields;
    });
};

const createValues = (tableName, fields, values) => {
  const columns = fields.join(', '); // Join the field names with commas
  const placeholders = fields.map(() => '?').join(', '); // Create placeholders for values
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format the current date

  const query = `INSERT INTO ${tableName} (${columns}, createdAt,updatedAt) VALUES (${placeholders}, ?,?)`;

  // Assuming you want to execute this query using Sequelize
  return sequelize.query(query, {
    replacements: [...Object.values(values), currentDate,currentDate], // Include the formatted date
    type: sequelize.QueryTypes.INSERT,
  });
};




module.exports = {getTablefields, getTableValues,createTable,createValues};
