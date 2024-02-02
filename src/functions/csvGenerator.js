// CsvGenerator.js
import React from 'react';

const CsvGenerator = ({ data }) => {
  const generateCsvContent = () => {
    const csvRows = [];

    // Header
    const header = Object.keys(data[0]);
    csvRows.push(header.join(','));

    // Rows
    data.forEach((row) => {
      const values = header.map(key => {
        const cellValue = row[key]; 
        // Wrap values containing commas in double quotes
        return typeof cellValue === 'string' && cellValue.includes(',')
          ? `"${cellValue}"`
          : cellValue;
      });
      csvRows.push(values.join(','));
    });

    return encodeURI('data:text/csv;charset=utf-8,' + csvRows.join('\n'));
  };

  return (
    <div>
      <button
        onClick={() => {
          const encodedUri = generateCsvContent();
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', 'data.csv');
          document.body.appendChild(link);
          link.click();
        }}
      >
        Download CSV
      </button>
    </div>
  );
};

export default CsvGenerator;
