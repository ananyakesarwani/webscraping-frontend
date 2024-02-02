import { ApiInstance } from "./apiInstance";

export const SearchByPartRequest = async (apiKey, searchText) => {
  const apiUrl = `https://api.mouser.com/api/v1/search/partnumber?apiKey=${apiKey}`;

  const requestBody = {
    SearchByPartRequest: {
      mouserPartNumber: searchText,
      partSearchOptions: "",
    },
  };

  try {
    const response = await ApiInstance.post(apiUrl, requestBody);
    return response.data.SearchResults.Parts;
  } catch (error) {
    console.log(error);
  }
};
