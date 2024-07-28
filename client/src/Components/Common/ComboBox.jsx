import React, { useState } from 'react';

const ComboBox = ({ options, selectedValue, onValueChange, border }) => {
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <div>
      <select className={"border-black py-2 px-3 w-full "+(border? "border-0":"border")} id="combo-box" value={selectedValue} onChange={handleChange}>
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