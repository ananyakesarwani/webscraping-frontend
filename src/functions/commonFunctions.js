
//converting manufacturer part number to group of 10 strings separated by |
export const convertAndJoinStrings = (partNumbers) => {
  const uniquePartNumbers = Array.from(new Set(partNumbers));
  const maxLength = 9;
  const groupedStrings = [];

  for (let i = 0; i < uniquePartNumbers.length; i += maxLength) {
    const group = uniquePartNumbers.slice(i, i + maxLength);
    groupedStrings.push(group.join("|"));
  }

  return groupedStrings;
};

export const calculateTotalAmount = (priceBreak, requiredQuantity) => {
  let totalPrice = 0;
  let remainingQuantity = Number(requiredQuantity);
  const sortedList = priceBreak.sort((a, b) => Number(a.Price.substring(1)) / a.Quantity - Number(b.Price.substring(1)) / b.Quantity);

  // Iterate through the sorted prices to calculate the minimum total price
  for (const item of sortedList) {
      const quantityToTake = remainingQuantity >= item.Quantity ? item.Quantity : 0;
      let price = Number(item.Price.substring(1));
      totalPrice += price*quantityToTake ;
      remainingQuantity -= quantityToTake;

      if (remainingQuantity === 0) {
          break;
      }
  }

  // If remainingQuantity is greater than 0, it means required quantity cannot be met
  if (remainingQuantity > 0) {
      console.log("Required quantity cannot be met.");
  }

  return totalPrice;
};
//mapping recieved data to our columns
// export const mapTableData = (responseData) => {
//     let mappedTableData = responseData.map((part) => {
//       let partRow = {};
//       tableColumns.forEach((col) => {
//         if(col.title === "PriceBreaks") {
//             partRow[col.title] = (
//             <button 
//             onClick={(e,priceData=part[col.title]) => {handlePopupData(priceData)}}
//             >
//                 {"View price break"}
//             </button>
//             );
//         }
//         else {
//             partRow[col.title] = part[col.title] ? part[col.title] : "N/A";
//         }
//       });
//       let currentDateTime = new Date();
//       partRow["SearchDateTime"] = `${currentDateTime.toLocaleString()}`

//       return partRow;
//     });
//     return mappedTableData;
//   };

export const handlePopupData = (priceData) => {
    console.log("Price data ", priceData);
    return priceData;
}

export const convertListToString = (listOfObjects) => {
  const seenObjects = new Set();

  const jsonString = JSON.stringify(listOfObjects, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seenObjects.has(value)) {
        return;
      }
      seenObjects.add(value);
    }
    return value;
  });

  return jsonString;
}




