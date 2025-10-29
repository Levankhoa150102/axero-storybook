import React from 'react';
import CDNDateRangePicker from './DatePicker';

export default {
  title: 'Components/UptodateDesign/DatePicker',
  component: CDNDateRangePicker,
  layout: 'centered',
};

export const Default = (args) =>
    React.createElement(
        'div',
        { style: { padding: 20 } },
        React.createElement(CDNDateRangePicker, args)
    );

Default.args = {
  label: 'Date Range',
  startPlaceholder: 'Start Date',
  endPlaceholder: 'End Date',
};

Default.parameters = {
  docs: {
    description: {
      story: 'The default Date Range Picker component allowing users to select a start and end date from a calendar interface.'
    },
    source: {
      code: `
<div class="udp-root">
  <div class="udp-label">Date range</div>
  <div class="udp-row">
    <input class="udp-input" placeholder="Start Date" disabled />
    <p class="udp-to">to</p>
    <div class="udp-end-wrap">
      <input class="udp-input" placeholder="End Date" disabled />
      <i class="fa fa-calendar udp-icon" aria-hidden="true"></i>
    </div>
  </div>
</div>
      `
    }
  }
};