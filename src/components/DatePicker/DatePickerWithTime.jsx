import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DatePicker.css';

// try to import jquery and jquery-ui/timepicker addon when available in node_modules
let $ = null;
try {
  // eslint-disable-next-line global-require
  $ = require('jquery');
  // eslint-disable-next-line global-require
  require('jquery-ui-dist/jquery-ui');
  // import timepicker addon if present
  // eslint-disable-next-line global-require
  require('jquery-ui-timepicker-addon');
  // import jquery-ui css from the dist package (Storybook should bundle css imports)
  // eslint-disable-next-line global-require
  require('jquery-ui-dist/jquery-ui.css');
} catch (e) {
  // missing deps — we'll gracefully fall back to the React UI
  $ = window.jQuery || window.$ || null;
}

function pad(n) { return String(n).padStart(2, '0'); }

function formatDateTime(d) {
  if (!d) return '';
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const mins = pad(d.getMinutes());
  return `${day}/${month}/${year} ${hours}:${mins}`;
}

function parseDateTime(str) {
  if (!str) return null;
  // accept 'dd/mm/yyyy' or 'dd/mm/yyyy hh:MM' (24h)
  const parts = str.split(' ');
  const datePart = parts[0];
  const timePart = parts[1] || '00:00';
  const dparts = datePart.split('/').map(p => parseInt(p, 10));
  const tparts = timePart.split(':').map(p => parseInt(p, 10));
  if (dparts.length !== 3 || tparts.length !== 2) return null;
  const [dd, mm, yy] = dparts;
  const [hh, min] = tparts;
  if ([dd,mm,yy,hh,min].some(v => Number.isNaN(v))) return null;
  return new Date(yy, mm - 1, dd, hh, min);
}

export default function DatePickerWithTime({ value, onChange, placeholder = 'dd/mm/yyyy hh:mm', className = '' }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => parseDateTime(value) || new Date());
  const [selected, setSelected] = useState(() => parseDateTime(value));
  const [calendarView, setCalendarView] = useState('days'); // 'days'|'months'|'years'
  const [step, setStep] = useState('date'); // 'date' | 'hour' | 'minute'
  const [tempDate, setTempDate] = useState(null);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // initialize jQuery UI datetimepicker on the input if available
  useEffect(() => {
    if (!$ || !inputRef.current) return undefined;
    try {
      const $input = $(inputRef.current);
      // destroy previous if any
      if ($input.data('datetimepicker')) {
        $input.datetimepicker('destroy');
      }
      // initialize datetimepicker (from timepicker addon)
      if ($.fn && $.fn.datetimepicker) {
        $input.datetimepicker({
          dateFormat: 'dd/mm/yy',
          timeFormat: 'HH:mm',
          onClose: function(dateText, inst) {
            // onClose fires with combined date and time
            if (dateText) {
              const parsed = parseDateTime(dateText.replace(/-/g, '/'));
              setSelected(parsed);
              if (onChange) onChange(dateText);
            }
          }
        });
        // set initial value if provided
        if (value) $input.datetimepicker('setDate', parseDateTime(value));
        return () => { try { $input.datetimepicker('destroy'); } catch (err) {} };
      }
    } catch (err) {
      // ignore and fallback to custom UI
    }
    return undefined;
  }, [inputRef, value, onChange]);

  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }

  function prevMonth() {
    setCurrent(c => {
      if (calendarView === 'months') return new Date(c.getFullYear() - 1, c.getMonth(), 1);
      if (calendarView === 'years') return new Date(c.getFullYear() - 10, c.getMonth(), 1);
      return new Date(c.getFullYear(), c.getMonth() - 1, 1);
    });
  }
  function nextMonth() {
    setCurrent(c => {
      if (calendarView === 'months') return new Date(c.getFullYear() + 1, c.getMonth(), 1);
      if (calendarView === 'years') return new Date(c.getFullYear() + 10, c.getMonth(), 1);
      return new Date(c.getFullYear(), c.getMonth() + 1, 1);
    });
  }

  function toggleCalendarViewUp() {
    setCalendarView(v => (v === 'days' ? 'months' : v === 'months' ? 'years' : 'days'));
  }

  function chooseDate(day) {
    const picked = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
    setTempDate(picked);
    setStep('hour');
  }

  function chooseHour(hour24) {
    const d = new Date(tempDate);
    d.setHours(hour24);
    setTempDate(d);
    setStep('minute');
  }

  function chooseMinute(min) {
    const d = new Date(tempDate);
    d.setMinutes(min);
    setSelected(d);
    setOpen(false);
    setStep('date');
    setTempDate(null);
    if (onChange) onChange(formatDateTime(d));
  }

  // build days (same approach as DatePicker) and always pad to 42 cells
  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const startWeekday = monthStart.getDay();

  const days = [];
  const prevMonthEnd = new Date(current.getFullYear(), current.getMonth(), 0);
  for (let i = startWeekday - 1; i >= 0; i--) {
    const dt = new Date(prevMonthEnd.getFullYear(), prevMonthEnd.getMonth(), prevMonthEnd.getDate() - i);
    days.push({ date: dt, inMonth: false });
  }
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    days.push({ date: new Date(current.getFullYear(), current.getMonth(), d), inMonth: true });
  }
  let nextDay = 1;
  while (days.length % 7 !== 0 || days.length < 42) {
    const dt = new Date(current.getFullYear(), current.getMonth() + 1, nextDay);
    days.push({ date: dt, inMonth: false });
    nextDay += 1;
  }

  // hour grid: AM then PM, hours 12,1..11
  const amHours = [12,1,2,3,4,5,6,7,8,9,10,11];
  const pmHours = [12,1,2,3,4,5,6,7,8,9,10,11];
  const minutes = Array.from({length:12}, (_,i) => i * 5); // 0,5,10,...55

  function pickMonth(monthIndex) {
    // monthIndex 0-11
    const year = current.getFullYear();
    setCurrent(new Date(year, monthIndex, 1));
    // preserve previously selected day (or tempDate) but with new year/month
    const base = tempDate || selected || new Date();
    const daysInTarget = new Date(year, monthIndex + 1, 0).getDate();
    const day = Math.min(base.getDate(), daysInTarget);
    const newDate = new Date(year, monthIndex, day, base.getHours ? base.getHours() : 0, base.getMinutes ? base.getMinutes() : 0);
    if (tempDate) {
      setTempDate(newDate);
    } else {
      setSelected(newDate);
    }
    setCalendarView('days');
  }

  function pickYear(year) {
    const prev = current;
    // compute current decade start/end
    const decadeStart = Math.floor(prev.getFullYear() / 10) * 10;
    const decadeEnd = decadeStart + 9;
    if (year < decadeStart) {
      // shift back one decade and keep years view
      setCurrent(new Date(prev.getFullYear() - 10, prev.getMonth(), 1));
      return;
    }
    if (year > decadeEnd) {
      // shift forward one decade and keep years view
      setCurrent(new Date(prev.getFullYear() + 10, prev.getMonth(), 1));
      return;
    }
    // year within decade -> select it and go to months view
    setCurrent(new Date(year, prev.getMonth(), 1));
    // preserve previously selected day/month but with new year
    const base = tempDate || selected || new Date();
    const daysInTarget = new Date(year, base.getMonth() + 1, 0).getDate();
    const day = Math.min(base.getDate(), daysInTarget);
    const newDate = new Date(year, base.getMonth(), day, base.getHours ? base.getHours() : 0, base.getMinutes ? base.getMinutes() : 0);
    if (tempDate) setTempDate(newDate); else setSelected(newDate);
    setCalendarView('months');
  }

  return (
    <div className={`dp-root ${className}`} ref={rootRef}>
      <div className="dp-input-wrap">
        <label className='input-label'>Date & time</label>
        <input
          ref={inputRef}
          type="text"
          className="dp-input"
          value={selected ? formatDateTime(selected) : ''}
          placeholder={placeholder}
          readOnly
          onClick={() => { setOpen(s => !s); setStep('date'); }}
        />
        <button type="button" className="dp-clear" onClick={() => { setSelected(null); if (onChange) onChange(''); }} aria-label="Clear"></button>
      </div>

      {open && (
        <div className="dp-popup">
          <div className="dp-header">
            <button type="button" className="dp-nav" onClick={prevMonth} aria-label="Previous month">«</button>
            <button type="button" className="dp-month-label" onClick={toggleCalendarViewUp} style={{background:'transparent',border:'none',cursor:'pointer',fontWeight:700}}>
              {/* show short selected date if available, otherwise show month+year or view-specific header */}
              {calendarView === 'days' ? (
                selected ? `${selected.getMonth()+1}/${selected.getDate()}/${selected.getFullYear()}` : `${current.toLocaleString(undefined, { month: 'long' })} ${current.getFullYear()}`
              ) : calendarView === 'months' ? (
                `${current.getFullYear()}`
              ) : (
                `${Math.floor(current.getFullYear() / 10) * 10}-${Math.floor(current.getFullYear() / 10) * 10 + 9}`
              )}
            </button>
            <button type="button" className="dp-nav" onClick={nextMonth} aria-label="Next month">»</button>
          </div>

          {step === 'date' && (
            <div className="dp-calendar">
              {calendarView === 'days' && (
                <>
                  <div className="dp-weekdays">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(w => <div key={w} className="dp-weekday">{w}</div>)}
                  </div>
                  <div className="dp-days">
                    {days.map((cell, idx) => {
                      const dt = cell.date;
                      return (
                        <button key={idx} type="button" className={`dp-day ${cell.inMonth ? '' : 'dp-day--other'}`} onClick={() => chooseDate(dt)}>
                          {dt.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {calendarView === 'months' && (
                <div className="dp-months" style={{padding:8}}>
                  {Array.from({length:12}, (_,i) => (
                    <button key={`m-${i}`} type="button" className="dp-day" style={{margin:4}} onClick={() => pickMonth(i)}>{new Date(0,i).toLocaleString(undefined,{month:'short'})}</button>
                  ))}
                </div>
              )}

              {calendarView === 'years' && (
                <div className="dp-years" style={{padding:8}}>
                  {(() => {
                    const start = Math.floor(current.getFullYear() / 10) * 10;
                    // render 12 cells: start-1, start..start+9, start+10
                    const years = [start - 1, ...Array.from({length:10}, (_,i) => start + i), start + 10];
                    return years.map((y, idx) => {
                      const isOther = idx === 0 || idx === years.length - 1;
                      return (
                        <button key={`y-${y}`} type="button" className={`dp-day ${isOther ? 'dp-year--other' : ''}`} style={{margin:4}} onClick={() => pickYear(y)}>{y}</button>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          )}

          {step === 'hour' && (
            <div className="dp-time">
              <div className="dp-time-header">
                <button type="button" className="dp-nav" onClick={() => setStep('date')} aria-label="Back">←</button>
                <div className="dp-time-title">{tempDate ? tempDate.toLocaleDateString() : ''}</div>
                <div style={{width:32}} />
              </div>

              <div className="dp-time-section">
                <div className="dp-time-label">AM</div>
                <div className="dp-time-grid">
                  {amHours.map((h) => (
                    <button key={`am-${h}`} type="button" className="dp-time-cell" onClick={() => {
                      // map 12->0 for AM
                      const hour24 = h === 12 ? 0 : h;
                      chooseHour(hour24);
                    }}>{h}</button>
                  ))}
                </div>
              </div>

              <div className="dp-time-section">
                <div className="dp-time-label">PM</div>
                <div className="dp-time-grid">
                  {pmHours.map((h) => (
                    <button key={`pm-${h}`} type="button" className="dp-time-cell" onClick={() => {
                      // map 12->12 for PM, then 1->13..11->23
                      const hour24 = h === 12 ? 12 : h + 12;
                      chooseHour(hour24);
                    }}>{h}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'minute' && (
            <div className="dp-time">
              <div className="dp-time-header">
                <button type="button" className="dp-nav" onClick={() => setStep('hour')} aria-label="Back">←</button>
                <div className="dp-time-title">{tempDate ? `${tempDate.toLocaleDateString()} ${tempDate.getHours()}:` : ''}</div>
                <div style={{width:32}} />
              </div>

              <div className="dp-time-section">
                <div className="dp-time-grid">
                  {minutes.map((m) => (
                    <button key={`min-${m}`} type="button" className="dp-time-cell" onClick={() => chooseMinute(m)}>{pad(m)}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

DatePickerWithTime.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
