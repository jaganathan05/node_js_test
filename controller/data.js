const sequelize = require('../helper/database');
const path = require('path')
const dataModel= require('../model/data')
exports.CreateTable=(req,res,next)=>{

    sequelize.query('SHOW TABLES')
    .then(([results, metadata]) => {
        const tableNames = results.map(result => result['Tables_in_databasemanagement']);

        console.log(tableNames);
    res.render('index',{
        path:'/home',
        tableNames:tableNames,
    })
})
}

exports.PostTable = (req,res,next)=>{
    const TN = req.body.tablename;
    const FN = req.body.fieldname;
    const FT = req.body.type;
    const Table = dataModel.createTable(TN,FN,FT);
    sequelize.sync()
    .then(()=>{
        res.redirect('/home')})
    
}

exports.getTable = (req, res, next) => {
    const tableName = req.params.tableName;
    dataModel.getTableValues(tableName)
        .then(data => {
            return dataModel.getTablefields(tableName)
                .then(fields => {
                    fields=fields.slice(1,-2);
                    console.log(fields)
                    res.render('table', {
                        tableName: tableName,
                        fields: fields,
                        data: data, 
                    });
                });
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        });
}

exports.addValue =(req,res,next)=>{
    const tableName = req.body.tableName;
    const fields = [req.body.fields];
    console.log(tableName,fields)
    const values = {}; // Create an object to store the new values.
    // Get the new values from the form fields.
    fields.forEach(field => {
        values[field] = req.body.value;
    });
    dataModel.createValues(tableName, fields, values)
        .then(() => {
            // Redirect back to the table page after adding the new values.
            res.redirect(`/table/${tableName}`);
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        });


    console.log(values)
    
}