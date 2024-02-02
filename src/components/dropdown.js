import React from 'react';
import { searchOptions } from '../constants/constants';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; 

const Dropdown = ({ selectedOption, onOptionChange }) => {
  return (
    <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="partNumber"
          onChange={(e)=>onOptionChange(e)}
        >
          {searchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
  );
};

export default Dropdown;
