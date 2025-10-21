import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../shared/variables.css';
import './Table.css';
import { Button } from '../Button/Button.jsx';
import { Checkbox } from '../Checkbox/Checkbox.jsx';

/**
 * Table component for displaying tabular data with sorting, selection, and actions
 */
export const Table = ({
    columns = [],
    data = [],
    selectable = false,
    onRowSelect = () => { },
    onRowAction = () => { },
    className = '',
    showHeader = true,
    headerActions = [],
    onHeaderAction = () => { },
    totalRecordsLabel = 'Total records:',
    // Pagination props
    showPagination = false,
    currentPage = 1,
    itemsPerPage = 10,
    totalItems = 0,
    onPageChange = () => { },
    onItemsPerPageChange = () => { },
    pageSizeOptions = [10, 25, 50, 100],
    ...props
}) => {
    const [selectedRows, setSelectedRows] = useState(new Set());

    // Pagination calculations
    const totalPages = Math.ceil((totalItems || data.length) / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems || data.length);
    const displayedItems = totalItems || data.length;

    // Handle individual row selection
    const handleRowSelect = (rowIndex, checked) => {
        const newSelectedRows = new Set(selectedRows);
        if (checked) {
            newSelectedRows.add(rowIndex);
        } else {
            newSelectedRows.delete(rowIndex);
        }
        setSelectedRows(newSelectedRows);
        onRowSelect(Array.from(newSelectedRows), data.filter((_, index) => newSelectedRows.has(index)));
    };

    // Handle select all rows
    const handleSelectAll = (checked) => {
        if (checked) {
            const allRows = new Set(data.map((_, index) => index));
            setSelectedRows(allRows);
            onRowSelect(Array.from(allRows), data);
        } else {
            setSelectedRows(new Set());
            onRowSelect([], []);
        }
    };



    // Render cell content
    const renderCellContent = (column, row, rowIndex) => {
        if (column.render) {
            return column.render(row[column.key], row, rowIndex);
        }

        if (column.type === 'action') {
            return (
                <div className="table-actions">
                    {column.actions?.map((action, actionIndex) => (
                        <Button
                            key={actionIndex}
                            size="small"
                            variant={action.variant || 'secondary'}
                            label={action.label}
                            onClick={() => onRowAction(action.key, row, rowIndex)}
                            {...action.props}
                        />
                    ))}
                </div>
            );
        }

        return row[column.key];
    };

    // Build table classes
    const tableClasses = [
        'table',
        className
    ].filter(Boolean).join(' ');

    const allSelected = selectedRows.size === data.length && data.length > 0;
    const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

    return (
            <div className="table-container" {...props}>
                {showHeader && (
                    <div className="table-toolbar">
                        <div className="table-info">
                            <span className="table-record-count">
                                {totalRecordsLabel} {data.length}
                            </span>
                        </div>
                        <div class="table-actions-header">
                            <button class="btn btn--danger">Delete Selected</button>
                            <button class="btn btn--secondary">Bulk Edit</button>
                        </div>
                        {headerActions.length > 0 && (
                            <div className="table-actions-header">
                                {headerActions.map((action, index) => (
                                    <Button
                                        key={index}
                                        size={action.size}
                                        variant={action.variant || 'secondary'}
                                        label={action.label}
                                        onClick={() => onHeaderAction(action.key, action)}
                                        {...action.props}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <table className={tableClasses}>
                    <thead className="table-header">
                        <tr>
                            {selectable && (
                                <th className="table-cell table-cell--select">
                                    <Checkbox
                                        checked={allSelected}
                                        indeterminate={someSelected}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        aria-label="Select all rows"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`table-cell table-cell--header ${column.align ? `table-cell--${column.align}` : ''}`}
                                    style={{ width: column.width }}
                                >
                                    <span className="table-header-label">{column.title}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`table-row ${selectedRows.has(rowIndex) ? 'table-row--selected' : ''}`}
                            >
                                {selectable && (
                                    <td className="table-cell table-cell--select">
                                        <Checkbox
                                            checked={selectedRows.has(rowIndex)}
                                            onChange={(e) => handleRowSelect(rowIndex, e.target.checked)}
                                            aria-label={`Select row ${rowIndex + 1}`}
                                        />
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`table-cell ${column.align ? `table-cell--${column.align}` : ''}`}
                                    >
                                        {renderCellContent(column, row, rowIndex)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showPagination && (
                    <div className="table-pagination">
                        <div className="table-pagination-info">
                            <span className="table-pagination-summary">
                                Page {currentPage} of {totalPages} ({displayedItems} items)
                            </span>
                        </div>

                        <div className="table-pagination-controls">
                            <div className="table-pagination-size">
                                <label htmlFor="items-per-page" className="table-pagination-label">
                                    per page
                                </label>
                                <select
                                    id="items-per-page"
                                    className="table-pagination-select"
                                    value={itemsPerPage}
                                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                                >
                                    {pageSizeOptions.map(size => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
};

Table.propTypes = {
    /**
     * Array of column definitions
     */
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            width: PropTypes.string,
            align: PropTypes.oneOf(['left', 'center', 'right']),
            type: PropTypes.oneOf(['text', 'action']),
            render: PropTypes.func,
            actions: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    variant: PropTypes.string,
                    props: PropTypes.object,
                })
            ),
        })
    ).isRequired,
    /**
     * Array of data objects to display
     */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /**
     * Enable row selection with checkboxes
     */
    selectable: PropTypes.bool,
    /**
     * Callback when rows are selected
     */
    onRowSelect: PropTypes.func,
    /**
     * Callback when action button is clicked
     */
    onRowAction: PropTypes.func,
    /**
     * Additional CSS classes
     */
    className: PropTypes.string,
    /**
     * Show header section with total records and actions
     */
    showHeader: PropTypes.bool,
    /**
     * Array of header action buttons
     */
    headerActions: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            variant: PropTypes.string,
            size: PropTypes.string,
            props: PropTypes.object,
        })
    ),
    /**
     * Callback when header action is clicked
     */
    onHeaderAction: PropTypes.func,
    /**
     * Label text for total records display
     */
    totalRecordsLabel: PropTypes.string,
    /**
     * Show pagination controls
     */
    showPagination: PropTypes.bool,
    /**
     * Current page number (1-based)
     */
    currentPage: PropTypes.number,
    /**
     * Number of items to show per page
     */
    itemsPerPage: PropTypes.number,
    /**
     * Total number of items (for server-side pagination)
     */
    totalItems: PropTypes.number,
    /**
     * Callback when page changes
     */
    onPageChange: PropTypes.func,
    /**
     * Callback when items per page changes
     */
    onItemsPerPageChange: PropTypes.func,
    /**
     * Available page size options
     */
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
};