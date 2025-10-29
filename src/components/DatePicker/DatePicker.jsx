import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DatePicker.css';

function formatDate(d) {
  if (!d) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseDate(str) {
  if (!str) return null;
  const parts = str.split('/');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(p => parseInt(p, 10));
  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) return null;
  return new Date(y, m - 1, d);
}

export default function DatePicker({ value, onChange, placeholder = 'dd/mm/yyyy', className = '' }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => parseDate(value) || new Date());
  const [selected, setSelected] = useState(() => parseDate(value));
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  // Try to initialize jQuery UI datepicker if available
  useEffect(() => {
    const $ = window.jQuery || window.$;
    if ($ && $.fn && $.fn.datepicker) {
      const $input = $(inputRef.current);
      $input.datepicker('destroy');
      $input.datepicker({ dateFormat: 'dd/mm/yy', onSelect: (val) => {
        const d = parseDate(val);
        setSelected(d);
        if (onChange) onChange(val);
      }});
      // set initial value
      if (value) $input.datepicker('setDate', value);
      return () => { $input.datepicker('destroy'); };
    }
    return undefined;
  }, [value, onChange]);

  // click outside to close
  useEffect(() => {
    function handler(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }

  function prevMonth() { setCurrent(c => new Date(c.getFullYear(), c.getMonth() - 1, 1)); }
  function nextMonth() { setCurrent(c => new Date(c.getFullYear(), c.getMonth() + 1, 1)); }

  function handleDateClick(day) {
    // when a date is chosen, make sure the calendar shows the month of that date
    setCurrent(new Date(day.getFullYear(), day.getMonth(), 1));
    setSelected(day);
    setOpen(false);
    const formatted = formatDate(day);
    if (onChange) onChange(formatted);
  }

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const startWeekday = monthStart.getDay(); // 0-6 (Sun-Sat)

  const days = [];
  // previous month's tail days to fill the first week
  const prevMonthEnd = new Date(current.getFullYear(), current.getMonth(), 0);
  for (let i = startWeekday - 1; i >= 0; i--) {
    const dt = new Date(prevMonthEnd.getFullYear(), prevMonthEnd.getMonth(), prevMonthEnd.getDate() - i);
    days.push({ date: dt, inMonth: false });
  }

  // current month days
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    days.push({ date: new Date(current.getFullYear(), current.getMonth(), d), inMonth: true });
  }

  // pad next month's leading days so the grid always has 6 rows (42 cells)
  // after adding prev-month tail and current month days, add next-month days
  // until days.length is a multiple of 7 and equals 42
  let nextDay = 1;
  while (days.length % 7 !== 0 || days.length < 42) {
    const dt = new Date(current.getFullYear(), current.getMonth() + 1, nextDay);
    days.push({ date: dt, inMonth: false });
    nextDay += 1;
  }

  return (
    <div className={`dp-root ${className}`} ref={rootRef}>
      <div className="dp-input-wrap">
        <label className='input-label'>Date of birth</label>
        <input
          ref={inputRef}
          type="text"
          className="dp-input"
          value={selected ? formatDate(selected) : ''}
          placeholder={placeholder}
          readOnly
          onClick={() => setOpen(s => !s)}
        />
  <button type="button" className="dp-clear" onClick={() => { setSelected(null); if (onChange) onChange(''); }} aria-label="Clear"></button>
      </div>

      {open && (
        <div className="dp-popup">
          <div className="dp-header">
            <button type="button" className="dp-nav" onClick={prevMonth} aria-label="Previous month">«</button>
            <div className="dp-month-label">{current.toLocaleString(undefined, { month: 'long' })} {current.getFullYear()}</div>
            <button type="button" className="dp-nav" onClick={nextMonth} aria-label="Next month">»</button>
          </div>

          <div className="dp-calendar">
            <div className="dp-weekdays">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(w => <div key={w} className="dp-weekday">{w}</div>)}
            </div>
            <div className="dp-days">
              {days.map((cell, idx) => {
                const dt = cell.date;
                if (!cell.inMonth) {
                  return (
                    <button key={idx} type="button" className="dp-day dp-day--other" onClick={() => handleDateClick(dt)}>
                      {dt.getDate()}
                    </button>
                  );
                }
                const isSelected = selected && dt.toDateString() === selected.toDateString();
                return (
                  <button key={idx} type="button" className={`dp-day ${isSelected ? 'dp-day--selected' : ''}`} onClick={() => handleDateClick(dt)}>
                    {dt.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
