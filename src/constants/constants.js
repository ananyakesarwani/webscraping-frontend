export const tableColumns = [
  {
    title: "ManufacturerPartNumber",
    label: "Manufacturer Part Number",
    visible: true,
  },
  {
    title: "SearchDateTime",
    label: "Search Date Time",
    visible: true,
  },

  {
    title: "AvailabilityInStock",
    label: "Availability In Stock",
    visible: true,
  },
  {
    title: "Manufacturer",
    label: "Manufacturer",
    visible: true,
  },

  {
    title: "PriceBreaks",
    label: "Price Breaks",
    visible: false,
  },
  /* {
    title: "PriceBreaks",
    label: "Price Breaks",
    visible: false,
  }, */

  /* {
    title: "AvailabilityOnOrder",
    label: "Availability On Order",
    visible: false,
  }, */
];

export const priceTableData = [
  {
    title: "Quantity",
    label: "Quantity",
    visible: true,
  },
  {
    title: "Price",
    label: "Price",
    visible: true,
  },
  {
    title: "Currency",
    label: "Currency",
    visible: true,
  },
];

export const searchOptions = [
  { value: "keyword", label: "Search by Keyword" },
  { value: "partNumber", label: "Search by Part Number" },
  { value: "csvUpload", label: "Upload CSV" },
];

export const appConstants = {
  apiKey: "0ea9d638-2bdf-44a7-a55f-b0d05687e000",
  priceTableKey: "Quantity",
  tableKey: "MouserPartNumber",
};
