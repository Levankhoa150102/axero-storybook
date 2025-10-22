import React, { useState } from 'react';
import { Drawer } from './Drawer.jsx';

export default {
    title: 'UI Components/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
    }
};

export const Default = {
    render: function (args) {
        const [openRight, setOpenRight] = useState(false);
        const [openLeft, setOpenLeft] = useState(false);
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                "button",
                {
                    className: "btn",
                    onClick: () => setOpenLeft(true),
                    style: { marginRight: 8 },
                },
                "Left Drawer"
            ),
            React.createElement(
                Drawer,
                {
                    open: openLeft,
                    onClose: () => setOpenLeft(false),
                    title: args.title,
                    placement: "left"
                },
                React.createElement(
                    "div",
                    { style: { padding: 24 } },
                    "This is the left drawer content."
                )
            ),
            React.createElement(
                "button",
                {
                    className: "btn",
                    onClick: () => setOpenRight(true),
                },
                "Right Drawer"
            ),
            React.createElement(
                Drawer,
                {
                    open: openRight,
                    onClose: () => setOpenRight(false),
                    title: args.title,
                    placement: "right"
                },
                React.createElement(
                    "div",
                    { style: { padding: 24 } },
                    "This is the right drawer content."
                )
            )
        );
    },
    args: {
        title: 'Drawer Title',
    },
    parameters: {
        docs: {
            description: {
                story: 'The default Drawer component that slides in from the right side of the screen.'
            }
        },
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `<!-- Right Drawer -->
    <button class="btn">Right Drawer</button>
    <div class="drawer-root drawer-open">
        <div class="drawer-overlay"></div>
        <div class="drawer-panel drawer-panel-right">
            <div class="drawer-header">
                <span class="drawer-title">Drawer Title</span>
                <button class="drawer-close" aria-label="Close">×</button>
            </div>
            <div class="drawer-content">
                <p>This is the right drawer content.</p>
            </div>
            <div className="drawer-footer">
                <button className="btn btn--extra-large" style={{ minWidth: '150px' }}>Cancel</button>
                <button className="btn btn--extra-large" style={{ backgroundColor: '#51A351', color: '#ffffff', minWidth: '150px'}} >Save</button>
            </div>            
        </div>
    </div>

    <!-- Left Drawer -->
    <button class="btn">Left Drawer</button>
    <div class="drawer-root drawer-open">
        <div class="drawer-overlay"></div>
        <div class="drawer-panel drawer-panel-left">
            <div class="drawer-header">
                <span class="drawer-title">Drawer Title</span>
                <button class="drawer-close" aria-label="Close">×</button>
            </div>
            <div class="drawer-content">
                <p>This is the left drawer content.</p>
            </div>
            <div className="drawer-footer">
                <button className="btn btn--extra-large" style={{ minWidth: '150px' }}>Cancel</button>
                <button className="btn btn--extra-large" style={{ backgroundColor: '#51A351', color: '#ffffff', minWidth: '150px'}} >Save</button>
            </div> 
        </div>
    </div>`,
        }
    }
};
