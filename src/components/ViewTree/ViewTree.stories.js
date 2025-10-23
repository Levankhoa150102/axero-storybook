import React from 'react';
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
