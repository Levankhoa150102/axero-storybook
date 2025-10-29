import React, { useEffect, useRef, useState } from 'react';
import './DatePicker.css';

export default function CDNDateRangePicker({ onChange, value, label = 'Date range', startPlaceholder = 'Start Date', endPlaceholder = 'End Date' }) {
  const endRef = useRef(null);
  const [startVal, setStartVal] = useState('');
  const [endVal, setEndVal] = useState('');

  useEffect(() => {
    // inject CSS
    const cssUrl = 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css';
    const cssEl = document.createElement('link');
    cssEl.rel = 'stylesheet';
    cssEl.type = 'text/css';
    cssEl.href = cssUrl;
    document.head.appendChild(cssEl);

    // inject jQuery
    const jq = document.createElement('script');
    jq.src = 'https://cdn.jsdelivr.net/jquery/latest/jquery.min.js';
    jq.async = true;
    document.body.appendChild(jq);

    // inject moment
    const mom = document.createElement('script');
    mom.src = 'https://cdn.jsdelivr.net/momentjs/latest/moment.min.js';
    mom.async = true;
    document.body.appendChild(mom);

    // inject daterangepicker
    const dr = document.createElement('script');
    dr.src = 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js';
    dr.async = true;
    document.body.appendChild(dr);

    // attempt to initialize the plugin on the end input
    function tryInit() {
      const $ = window.jQuery || window.$;
      if (!($ && $.fn && $.fn.daterangepicker && endRef.current)) return false;

      const $end = $(endRef.current);
      // remove any existing instance to avoid duplicates (HMR/remount)
      if ($end.data && $end.data('daterangepicker')) {
        try { $end.data('daterangepicker').remove(); } catch (err) {}
      }

      // initialize daterangepicker attached to the visible end input
      $end.daterangepicker({
        opens: 'right',
        drops: 'down',
        autoUpdateInput: false,
        locale: { format: 'DD/MM/YYYY' }
      }, function(start, end) {
        const s = start ? start.format('DD/MM/YYYY') : '';
        const e = end ? end.format('DD/MM/YYYY') : '';
        setStartVal(s);
        setEndVal(e);
        if (onChange) onChange({ start: s, end: e });
      });

        // prevent opening by input interactions; only the icon will open the picker
        try { $end.off('.daterangepicker'); } catch (err) {}
        try { $end.prop('readonly', true); } catch (err) {}

      // also update on apply event
      $end.on('apply.daterangepicker', function(ev, picker) {
        const s = picker.startDate ? picker.startDate.format('DD/MM/YYYY') : '';
        const e = picker.endDate ? picker.endDate.format('DD/MM/YYYY') : '';
        setStartVal(s);
        setEndVal(e);
        if (onChange) onChange({ start: s, end: e });
      });

      return true;
    }

    let tries = 0;
    const t = setInterval(() => {
      tries += 1;
      if (tryInit() || tries > 50) clearInterval(t);
    }, 200);

    return () => {
      clearInterval(t);
    };
  }, [onChange]);

  // show the picker programmatically
  function showPicker() {
    const $ = window.jQuery || window.$;
    if (!($ && endRef.current)) return;

    const $end = $(endRef.current);
    const inst = $end.data && $end.data('daterangepicker');
    // helper: determine if picker is currently visible
    function isPickerShown(instance) {
      try {
        if (!instance) return false;
        if (instance.isShowing !== undefined) return !!instance.isShowing;
        // fallback: check DOM element visibility
        const el = instance && instance.container ? instance.container : null;
        if (!el) return false;
        return $(el).is(':visible');
      } catch (err) { return false; }
    }

    try {
      if (inst && typeof inst.show === 'function' && typeof inst.hide === 'function') {
        if (isPickerShown(inst)) {
          inst.hide();
        } else {
          inst.show();
        }
        return;
      }
      // final fallback: call show if available
      if (inst && typeof inst.show === 'function') inst.show();
    } catch (err) {
      // ignore
    }
  }

  // clear selected values and reset daterangepicker instance
  function clearSelection() {
    setStartVal('');
    setEndVal('');
    const $ = window.jQuery || window.$;
    if ($ && endRef.current) {
      const $end = $(endRef.current);
      const inst = $end.data && $end.data('daterangepicker');
      try {
        if (inst && typeof inst.remove === 'function') inst.remove();
      } catch (err) {}

      // reinitialize empty instance so internal state is reset
      try {
        $end.daterangepicker({
          opens: 'right',
          drops: 'down',
          autoUpdateInput: false,
          locale: { format: 'DD/MM/YYYY' }
        }, function(start, end) {
          const s = start ? start.format('DD/MM/YYYY') : '';
          const e = end ? end.format('DD/MM/YYYY') : '';
          setStartVal(s);
          setEndVal(e);
          if (onChange) onChange({ start: s, end: e });
        });
        $end.on('apply.daterangepicker', function(ev, picker) {
          const s = picker.startDate ? picker.startDate.format('DD/MM/YYYY') : '';
          const e = picker.endDate ? picker.endDate.format('DD/MM/YYYY') : '';
          setStartVal(s);
          setEndVal(e);
          if (onChange) onChange({ start: s, end: e });
        });
        // prevent opening by input
        try { $end.off('.daterangepicker'); } catch (err) {}
        try { $end.prop('readonly', true); } catch (err) {}
      } catch (err) {
        // ignore
      }
    }
  }

  return (
    <div className="udp-root">
      <div className="udp-label">
        {label}
        {(startVal || endVal) ? (
          <a className='udp-clear' onClick={clearSelection} role="button">Clear</a>
        ) : null}
      </div>
      <div className="udp-row">
        <input className="udp-input" placeholder={startPlaceholder} value={startVal} disabled />
        <p className="udp-to">to</p>
        <div className="udp-end-wrap">
          <input className="udp-input" placeholder={endPlaceholder} value={endVal}  disabled />
          <i ref={endRef} className="fa fa-calendar udp-icon" onClick={showPicker} aria-hidden />
        </div>
      </div>
    </div>
  );
}
