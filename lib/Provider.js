"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticAction = exports.ProviderContext = exports.Provider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const staticAction = (0, react_1.createRef)();
exports.staticAction = staticAction;
const ProviderContext = (0, react_1.createContext)({
    push: () => { },
    modals: null
});
exports.ProviderContext = ProviderContext;
const Provider = ({ children, SPA = false }) => {
    const modals = (0, react_1.useRef)({});
    const modalsRef = (0, react_1.useRef)(null);
    const push = (name, show, hide) => {
        modals.current[name] = {
            show,
            hide
        };
    };
    const show = (name) => {
        if (name in modals.current) {
            modals.current[name].show();
        }
    };
    const hide = (name) => {
        if (name && name in modals.current) {
            modals.current[name].hide();
        }
        else {
            Object.keys(modals.current).forEach(hide);
        }
    };
    const createDynamicContainer = () => {
        const nameId = '__modals-container';
        const containerModals = document.getElementById(nameId);
        if (containerModals) {
            return containerModals;
        }
        else {
            const newContainerModals = document.createElement('div');
            newContainerModals.id = nameId;
            document.body.appendChild(newContainerModals);
            return newContainerModals;
        }
    };
    if (!SPA) {
        (0, react_1.useImperativeHandle)(modalsRef, createDynamicContainer);
    }
    (0, react_1.useImperativeHandle)(staticAction, () => ({
        show,
        hide
    }));
    return ((0, jsx_runtime_1.jsxs)(ProviderContext.Provider, { value: {
            push,
            modals: modalsRef
        }, children: [children, SPA && (0, jsx_runtime_1.jsx)("div", { ref: modalsRef })] }));
};
exports.Provider = Provider;
