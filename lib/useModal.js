"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const withModal_1 = require("./withModal");
const useModal = (config) => {
    const { setConfig, show, hide, state } = (0, react_1.useContext)(withModal_1.WhithModalContext);
    (0, react_1.useLayoutEffect)(() => {
        if (config)
            setConfig(config);
    }, []);
    return {
        show,
        hide,
        setConfig,
        state
    };
};
exports.useModal = useModal;
