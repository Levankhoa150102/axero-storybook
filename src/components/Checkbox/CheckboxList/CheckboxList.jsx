import PropTypes from 'prop-types';
import './CheckboxList.css';

export default function CheckboxList({ items = [], checked = {}, onChange }) {
  const handleToggle = (id) => (e) => {
    if (onChange) onChange(id, e.target.checked);
  };

  return (
    <div className="checkbox-list-root" role="list">
      {items.map((it, idx) => (
        <label key={it.id ?? idx} className="checkbox-list-row" role="listitem">
          <input
            type="checkbox"
            className="checkbox-input checkbox-list-input"
            checked={!!checked[it.id ?? idx]}
            onChange={handleToggle(it.id ?? idx)}
            aria-label={`Select ${it.label ?? it}`}
          />
          <span className="checkbox-text">{it.label ?? it}</span>
        </label>
      ))}
    </div>
  );
}

CheckboxList.propTypes = {
  items: PropTypes.array,
  checked: PropTypes.object,
  onChange: PropTypes.func,
};
