import React, { useState } from 'react';
import ViewTree from './ViewTree';

export default {
	title: 'UI Components/ViewTree',
	component: ViewTree,
};

const sample = [
	{ id: 'root', label: 'Root', children: [
		{ id: 'parent1', label: 'Parent Folder', children: [
			{ id: 'child1', label: 'Child Folder', children: [] }
		]},
		{ id: 'activity', label: 'Activity Stream Files', children: [
            { id: 'activity1', label: 'Activity File 1', children: [] },
        ] },
		{ id: 'parent3', label: 'Parent 3', children: [] }
	]}
];

export const Default = () => React.createElement(ViewTree, { nodes: sample });

Default.parameters = {
	docs: {
		source: {
			code: `		 <div class="view-tree-root">
      <div class="vt-node">
        <div class="vt-row">
          <button class="vt-toggle"><span class="vt-caret"></span></button>
          <label class="vt-checkbox-label">
            <input type="checkbox" />
            <span class="vt-label-text">Root</span>
          </label>
        </div>
        <div class="vt-children">
          <div class="vt-node">
            <div class="vt-row" style={{ paddingLeft: '16px' }}>
              <button class="vt-toggle"><span class="vt-caret"></span></button>
              <label class="vt-checkbox-label">
                <input type="checkbox" />
                <span class="vt-label-text">Parent Folder</span>
              </label>
            </div>
            <div class="vt-children">
              <div class="vt-node">
                <div class="vt-row" style={{ paddingLeft: '32px' }}>
                  <span class="vt-spacer"></span>
                  <label class="vt-checkbox-label">
                    <input type="checkbox" />
                    <span class="vt-label-text">Child Folder</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
    
          <div class="vt-node">
            <div class="vt-row" style={{ paddingLeft: '16px' }}>
              <button class="vt-toggle"><span class="vt-caret"></span></button>
              <label class="vt-checkbox-label">
                <input type="checkbox" />
                <span class="vt-label-text">Activity Stream Files</span>
              </label>
            </div>
            <div class="vt-children">
              <div class="vt-node">
                <div class="vt-row" style={{ paddingLeft: '32px' }}>
                  <span class="vt-spacer"></span>
                  <label class="vt-checkbox-label">
                    <input type="checkbox" />
                    <span class="vt-label-text">Activity File 1</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="vt-node">
            <div class="vt-row" style={{ paddingLeft: '16px' }}>
              <span class="vt-spacer"></span>
              <label class="vt-checkbox-label">
                <input type="checkbox" />
                <span class="vt-label-text">Parent 3</span>
              </label>
            </div>
          </div>
        </div>
      </div>
</div>`
		}
	}
};