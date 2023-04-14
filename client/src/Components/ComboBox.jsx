import React, { useState } from 'react';

const ComboBox = ({ options, selectedValue, onValueChange }) => {
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <div>
      <select className="border
       border-black py-2 px-3 w-full" id="combo-box" value={selectedValue} onChange={handleChange}>
        <option value="">Choose an option</option>
        {options.map((option, index) => (
          <option key={option.value + index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComboBox;