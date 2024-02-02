import React from "react";
import CSVReader from "react-csv-reader";

const CsvReaderComponent = (props) => {
  return (
    <div>
      <CSVReader
        onFileLoaded={(e) => props.handleCsvData(e)}
        parserOptions={{ header: true, skipEmptyLines: true }}
      />
      <button onClick={() => props.handleCsvDataSearch()}>
        <span role="img" aria-label="Search">
          🔍
        </span>
      </button>
    </div>
  );
};

export default CsvReaderComponent;