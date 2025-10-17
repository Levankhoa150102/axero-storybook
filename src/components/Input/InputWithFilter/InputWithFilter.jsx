import React, { useState } from 'react';
import './InputWithFilter.css';

const recipientsMock = [
  { id: 1, name: 'Aana Subspace', avatar: '', checked: false },
  { id: 2, name: 'Abby Williams', avatar: '', checked: false },
  { id: 3, name: 'Abhi2abhi Singh', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', checked: false },
  { id: 4, name: 'Abhishek M', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', checked: false },
  { id: 5, name: 'Abhishek Singh', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', checked: false },
];

export function InputWithFilter({
  recipients = recipientsMock,
  label = 'Additional recipients',
  placeholder = 'filter',
}) {
  const [filter, setFilter] = useState('');
  const [checked, setChecked] = useState({});

  const filtered = recipients.filter(r =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );

  const allChecked = filtered.length > 0 && filtered.every(r => checked[r.id]);
  const handleCheckAll = () => {
    const newChecked = { ...checked };
    filtered.forEach(r => { newChecked[r.id] = !allChecked; });
    setChecked(newChecked);
  };

  const handleCheck = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="input-with-filter-root">
      <div className="input-with-filter-label">{label}</div>
      <div className="input-with-filter-box">
        <div className="input-with-filter-input-row">
          <div className=' input-with-filter-checkbox--all'>
          <input
            type="checkbox"
            className="input-with-filter-checkbox"
            checked={allChecked}
            onChange={handleCheckAll}
            title="Select all filtered"
            />
            </div>
          <input
            className="input-with-filter-input"
            placeholder={placeholder}
            value={typeof filter === 'string' ? filter : ''}
            onChange={e => (typeof onFilterChange === 'function' ? onFilterChange(e.target.value) : setFilter(e.target.value))}
          />
        </div>
        <div className="input-with-filter-list">
          {filtered.map(r => (
            <label
              key={r.id}
              className={`input-with-filter-row${checked[r.id] ? ' input-with-filter-row--checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={!!checked[r.id]}
                onChange={() => handleCheck(r.id)}
                className="input-with-filter-checkbox"
              />
              {r.avatar ? (
                <img src={r.avatar} alt={r.name} className="input-with-filter-avatar" />
              ) : (
                <span className="input-with-filter-avatar input-with-filter-avatar--default">
                  <i className="fas fa-user" />
                </span>
              )}
              <span className="input-with-filter-name">{r.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export { InputWithFilter as default };
