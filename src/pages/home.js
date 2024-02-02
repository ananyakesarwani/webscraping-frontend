import React, { useEffect, useState } from "react";
import SearchBar from "../components/searchbar";
import DenseTable from "../components/table";
import BasicModal from "../components/modal";
import { SearchByPartRequest } from "../apiRequests/apiRequest";
import { tableColumns as columns } from "../constants/constants";
import CsvReaderComponent from "../components/fileUpload";
import {
  calculateTotalAmount,
  convertAndJoinStrings,
} from "../functions/commonFunctions";
import Dropdown from "../components/dropdown";
import { Button } from "@mui/material";
import { appConstants } from "../constants/constants";
import CsvGenerator from "../functions/csvGenerator";

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [searchOption, setSearchOption] = useState();
  const [searchText, setSearchText] = useState("");
  const [tableColumns, setTableColumns] = useState(columns);
  const [groupedSearchString, setGroupedSearchString] = useState();
  const [popoverAnchor, setPopoverAnchor] = useState(false);
  const [priceData, setPriceData] = useState();
  const [csvData, setCsvData] = useState([]);
  const [responseDataTemp, setResponseDataTemp] = useState([]);
  const [updatedCsvData, setUpdatedCsvData] = useState([]);

  const handlePopoverOpen = (priceBreak) => {
    setPopoverAnchor(!popoverAnchor);
    setPriceData(priceBreak);
  };

  useEffect(() => {
    updateCSVdataMethod();
  }, [responseDataTemp]);

  const handleSearch = async (apiKey, searchText) => {
    const response = await SearchByPartRequest(apiKey, searchText);
    setResponseDataTemp((prevResponseData) => {
      return [...prevResponseData, ...response];
    });
    setTableData((prevTableData) => {
      return [...prevTableData, ...mapTableData(response)];
    });
  };

  const updateCSVdataMethod = () => {
    const updatedCsvData = csvData.map((row) => {
      const matchingApiResult = responseDataTemp.find(
        (apiRow) => apiRow.ManufacturerPartNumber === row["Manufacturer Part"]
      );
      if (matchingApiResult) {
        return {
          ...row,
          Availability: matchingApiResult.AvailabilityInStock,
          SearchDateTime: new Date().toLocaleString(),
          TotalPrice: calculateTotalAmount(
            matchingApiResult.PriceBreaks,
            row.Quantity
          ),
        };
      } else {
        return {
          ...row,
          Availability: "N/A",
          SearchDateTime: new Date().toLocaleString(),
          TotalPrice: "N/A",
        };
      }
    });
    setUpdatedCsvData(updatedCsvData);
  };
  const handleOptionChange = (option) => {
    setSearchOption(option);
    setSearchText("");
  };

  const handleCsvData = async (data) => {
    setCsvData(data);
    const manufacturerPartColumn = data.map((row) => row["Manufacturer Part"]);
    setGroupedSearchString(convertAndJoinStrings(manufacturerPartColumn));
  };

  const handleCsvDataSearch = async () => {
    for (let i = 0; i < groupedSearchString.length; i++) {
      handleSearch(appConstants.apiKey, groupedSearchString[i]);
    }
  };

  const mapTableData = (responseData) => {
    let mappedTableData = responseData.map((part) => {
      let partRow = {};
      tableColumns.forEach((col) => {
        if (col.title === "PriceBreaks") {
          partRow[col.title] = (
            <Button
              onClick={(e, priceData = part[col.title]) => {
                handlePopoverOpen(priceData);
              }}
            >
              {"View price break"}
            </Button>
          );
        } else {
          partRow[col.title] = part[col.title] ? part[col.title] : "N/A";
        }
      });
      let currentDateTime = new Date();
      partRow["SearchDateTime"] = `${currentDateTime.toLocaleString()}`;

      return partRow;
    });
    return mappedTableData;
  };

  return (
    <div>
      <Dropdown
        selectedOption={searchOption}
        onOptionChange={handleOptionChange}
      />
      {searchOption && searchOption.target.value === "csvUpload" ? (
        <div>
          <CsvReaderComponent
            handleCsvData={(e) => handleCsvData(e)}
            handleCsvDataSearch={(e) => handleCsvDataSearch(e)}
          />
        </div>
      ) : (
        <SearchBar searchOption={searchOption} handleSearch={handleSearch} />
      )}
      {popoverAnchor && (
        <div>
          <BasicModal
            priceBreak={priceData}
            open={popoverAnchor}
            setOpen={setPopoverAnchor}
          />
        </div>
      )}
      <DenseTable
        data={tableData}
        columnList={tableColumns}
        key={appConstants.tableKey}
      />
      {csvData && csvData.length > 0 ? (
        <CsvGenerator data={updatedCsvData} />
      ) : (
        <CsvGenerator data={tableData} />
      )}
    </div>
  );
}
