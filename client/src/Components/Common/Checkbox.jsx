import React, { useState, useEffect } from 'react';

function Checkbox({ label, value, checkedValues, setCheckedValues }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checkedValues.includes(value)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedValues]);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);

    if (newValue) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((v) => v !== value));
    }
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;