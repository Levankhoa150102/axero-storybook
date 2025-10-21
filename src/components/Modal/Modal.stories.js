import React, { useState } from 'react';
import { Modal } from './Modal.jsx';
import { ModalWithFullScreen } from './ModalWithFullScreen/ModalWithFullScreen.jsx';
import { ModalConfirm } from './ModalConfirm/ModalConfirm.jsx';

export default {
    title: 'UI Components/Modal',
    component: Modal,
    layout: 'fullscreen',
    decorators: [
        (Story) => React.createElement(
            'div',
            {
                style: {
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }
            },
            React.createElement(Story)
        ),
    ],
    argTypes: {
        title: { control: 'text' },
        footer: { control: 'boolean' },
    },
};

export const Default = {
    args: {
        title: 'Modal Title',
        footer: true,
    },
    render: (args) => {
        const [open, setOpen] = useState(args.open);
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                "button",
                { className: "btn", onClick: () => setOpen(true) },
                "Open Modal"
            ),
            React.createElement(
                Modal,
                {
                    ...args,
                    open: open,
                    onClose: () => setOpen(false),
                    footer: args.footer
                        ? React.createElement(
                            "button",
                            { className: "btn", onClick: () => setOpen(false) },
                            "Close"
                        )
                        : null
                },
                React.createElement(
                    "div",
                    { style: { minWidth: 200 } },
                    "This is the modal content."
                )
            )
        );
    },
    parameters: {
        docs: {
            source: {
                code: `<button class="btn">Open Modal</button>
<div class="axero-modal-root">
  <div class="axero-modal-overlay"></div>
  <div class="axero-modal-panel">
    <div class="axero-modal-header">
      <span class="axero-modal-title">Modal Title</span>
      <button class="axero-modal-close">×</button>
    </div>
    <div class="axero-modal-content">This is the modal content.</div>
    <div className="axero-modal-footer">
        <button className="btn btn-primary-styles">Save changes</button>    
        <button className="btn">Close</button>
    </div>
  </div>
</div>`
            }
        }
    }
};

export const WithFullScreen = {
    component: ModalWithFullScreen,
    render: (args) => {
        const [open, setOpen] = useState(args.open);
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                "button",
                { className: "btn", onClick: () => setOpen(true) },
                "Open Full Screen Modal"
            ),
            React.createElement(
                ModalWithFullScreen,
                {
                    ...args,
                    open: open,
                    onClose: () => setOpen(false),
                },
                React.createElement(
                    "div",
                    { style: { minWidth: 200 } },
                    "This is the full screen modal content."
                )
            )
        );
    },
    parameters: {
        docs: {
            source: {
                code: `<button class="btn">Open Full Screen Modal</button>
<div class="axero-modal-fullscreen">
    <div class="axero-modal-overlay-fullscreen"></div>
    <div class="axero-modal-panel-fullscreen"></div>
        <div class="axero-modal-header-fullscreen">
            <span class="axero-modal-title-fullscreen">Full Screen Modal Title</span>
            <button class="axero-modal-close-fullscreen">×</button>
        </div>
        <div class="axero-modal-content-fullscreen">This is the full screen modal content.</div>
    </div>
</div>`
            }
        }
    }
};

export const WithConfirm = {
    component: ModalConfirm,
    args: {
        message: 'Confirm Action',
    },
    render: (args) => {
        const [open, setOpen] = useState(args.open);
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
            "button",
            { className: "btn", onClick: () => setOpen(true) },
            "Open Confirm Modal"
            ),
            React.createElement(
            ModalConfirm,
            {
                ...args,
                open: open,
                onClose: () => setOpen(false),
                onConfirm: () => {
                setOpen(false);
                },
                onCancel: () => setOpen(false),
            }
            )
        );
    },
    parameters: {
        docs: {
            source: {
                code: `
 <button class="btn">Open Confirm Modal</button>
            <div class="axero-modal-root">
                <div class="axero-modal-overlay" />
                <div class="axero-modal-panel">

                    <div class="axero-modal-confirm-header">
                        Confirm Action
                    </div>
                    <div class="axero-modal-confirm-content">
                        <button className="btn axero-confirm-btn">Yes</button>
                        <button className="btn axero-confirm-btn">No</button>
                    </div>
                </div>
            </div>`
            }
        }
    },
}