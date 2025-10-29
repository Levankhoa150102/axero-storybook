import React, { useState } from 'react';
import DatePicker from './DatePicker';
import DatePickerWithTime from './DatePickerWithTime';
export default {
  title: 'UI Components/DatePicker',
  component: DatePicker,
};

export const Default = () => {
  const [val, setVal] = useState('');
  return React.createElement(DatePicker, { value: val, onChange: (v) => setVal(v) });
};

// export const WithTime = (args) =>
//   React.createElement(
//     'div',
//     { style: { padding: 20 } },
//     React.createElement(DatePickerWithTime, args)
//   );
// WithTime.args = {
//   value: '',
// };
