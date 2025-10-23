import React, { useState, useRef, useEffect } from 'react';
import './ViewTree.css';

// Tree node shape: { id, label, children: [] }
export default function ViewTree({ nodes = [], allowIndeterminate = false }) {
	const [checkedMap, setCheckedMap] = useState({});
	const [expandedMap, setExpandedMap] = useState({});
	const inputRefs = useRef({});

	// Build maps for quick traversal
	const { parentMap, childrenMap, nodeMap } = React.useMemo(() => {
		const parentMap = {};
		const childrenMap = {};
		const nodeMap = {};

		function walk(list, parent = null) {
				(list || []).forEach((n) => {
					if (!n) return;
					nodeMap[n.id] = n;
					parentMap[n.id] = parent;
					const children = Array.isArray(n.children) ? n.children.filter(Boolean) : [];
					childrenMap[n.id] = children.map(c => c.id);
					walk(children, n.id);
				});
		}

		walk(nodes, null);
		return { parentMap, childrenMap, nodeMap };
	}, [nodes]);

	// Utility: get all descendant ids for a node
	function getDescendants(id) {
		const result = [];
		function rec(cur) {
			const children = childrenMap[cur] || [];
			children.forEach((c) => {
				result.push(c);
				rec(c);
			});
		}
		rec(id);
		return result;
	}

	// Determine if all nodes in subtree (including node itself) are checked
	function areAllChecked(id) {
		const ids = [id, ...getDescendants(id)];
		return ids.every(i => !!checkedMap[i]);
	}

	function isAnyChecked(id) {
		const ids = [id, ...getDescendants(id)];
		return ids.some(i => !!checkedMap[i]);
	}

	// Toggle expand/collapse
	function toggleExpand(id) {
		setExpandedMap(prev => ({ ...prev, [id]: !prev[id] }));
	}

	// Toggle checkbox: sets node and all descendants to checked/unchecked
	function handleCheckboxChange(id, checked) {
		const descendants = getDescendants(id);
		setCheckedMap(prev => {
			const next = { ...prev };
			next[id] = checked;
			descendants.forEach(d => { next[d] = checked; });
			return next;
		});
	}

	// After every checkedMap change, update indeterminate state on inputs
		useEffect(() => {
			Object.keys(inputRefs.current).forEach((id) => {
				const el = inputRefs.current[id];
				if (!el) return;
				const all = areAllChecked(id);
				const any = isAnyChecked(id);
				el.indeterminate = allowIndeterminate ? (!all && any) : false;
			});
		}, [checkedMap, allowIndeterminate]);

	// Render tree recursively
	function renderNodes(list, depth = 0) {
		return (list || []).map((n) => {
			const children = Array.isArray(n.children) ? n.children.filter(Boolean) : [];
			const hasChildren = children.length > 0;
			const isExpanded = !!expandedMap[n.id];
			const checkedAll = areAllChecked(n.id);
			return (
				<div className="vt-node" key={n.id}>
					<div className="vt-row" style={{ paddingLeft: depth * 16 }}>
						{hasChildren ? (
							<button
								type="button"
								className={`vt-toggle ${isExpanded ? 'open' : ''}`}
								onClick={() => toggleExpand(n.id)}
								aria-label={isExpanded ? 'Collapse' : 'Expand'}
							>
								<span className="vt-caret" />
							</button>
						) : (
							<span className="vt-spacer" />
						)}

						<label className="vt-checkbox-label">
							<input
								ref={(el) => { inputRefs.current[n.id] = el; }}
								type="checkbox"
								checked={!!checkedAll}
								onChange={(e) => handleCheckboxChange(n.id, e.target.checked)}
							/>
							<span className="vt-label-text">{n.label}</span>
						</label>
					</div>

					{hasChildren && isExpanded && (
						<div className="vt-children">
							{renderNodes(children, depth + 1)}
						</div>
					)}
				</div>
			);
		});
	}

	return (
		<div className="view-tree-root">
			{renderNodes(nodes)}
		</div>
	);
}

