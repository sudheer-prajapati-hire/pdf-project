const { PdfReader } = require('pdfreader');
const fs = require('fs');

let rows = {};

new PdfReader().parseFileItems('C:/table.pdf', (err, item) => {
  if (err) {
    console.error('Error reading PDF:', err);
  } else if (!item) {
    if (Object.keys(rows).length === 0) {
      console.log('No data extracted from the PDF.');
    } else {
      processTableData();
    }
  } else if (item.text) {
    console.log(`Text: ${item.text}, X: ${item.x}, Y: ${item.y}`);
    const y = item.y.toFixed(3); 
    const x = item.x.toFixed(3); 
    const text = item.text;

    if (!rows[y]) rows[y] = [];
    rows[y].push({ text, x });
  }
});

function processTableData() {
  const sortedRows = Object.keys(rows)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .map(y => rows[y].sort((a, b) => parseFloat(a.x) - parseFloat(b.x)).map(i => i.text));

  const headers = sortedRows[0];

  const tableData = sortedRows.slice(1).map(row => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index] || '';
    });
    return rowData;
  });
  
  fs.writeFileSync('data.json', JSON.stringify(tableData, null, 2));
  console.log('Table data extracted and saved to data.json');
}