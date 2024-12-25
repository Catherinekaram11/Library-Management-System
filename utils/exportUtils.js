const { parse } = require('json2csv'); 
const fs = require('fs');
const path = require('path');

const exportToCSV = async (data) => {
    const csv = parse(data);
    const filePath = path.join(__dirname, '../Exports/overdue_borrowings.csv'); 
    fs.writeFileSync(filePath, csv);
    return filePath; 
};

module.exports = exportToCSV;
