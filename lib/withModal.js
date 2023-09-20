"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withModal = exports.WhithModalContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const _1 = __importDefault(require("."));
exports.WhithModalContext = (0, react_1.createContext)({
    setConfig: () => { },
    footerRef: null,
    show: () => { },
    hide: () => { }
});
const withModal = (WrappedComponent, config) => {
    const currentRef = (0, react_1.createRef)();
    const show = () => {
        var _a;
        (_a = currentRef.current) === null || _a === void 0 ? void 0 : _a.show();
    };
    const hide = () => {
        var _a;
        (_a = currentRef.current) === null || _a === void 0 ? void 0 : _a.hide();
    };
    const container = () => (0, react_1.forwardRef)((_a, ref) => {
        var _b, _c, _d;
        var props = __rest(_a, []);
        const modalRef = (0, react_1.useRef)(null);
        const id = (0, react_1.useId)();
        const [currentConfig, _setConfig] = (0, react_1.useState)(config);
        const setConfig = (config) => {
            _setConfig((currentConfig) => (Object.assign(Object.assign({}, currentConfig), config)));
        };
        (0, react_1.useImperativeHandle)(currentRef, () => modalRef.current);
        return ((0, jsx_runtime_1.jsx)(exports.WhithModalContext.Provider, { value: {
                setConfig,
                footerRef: (_b = modalRef.current) === null || _b === void 0 ? void 0 : _b.footerRef,
                show,
                hide
            }, children: (0, jsx_runtime_1.jsx)(_1.default, Object.assign({ name: (_c = currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.name) !== null && _c !== void 0 ? _c : id, title: (_d = currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.title) !== null && _d !== void 0 ? _d : '' }, currentConfig, { ref: modalRef, children: (0, jsx_runtime_1.jsx)(WrappedComponent, Object.assign({}, props, { ref: ref })) })) }));
    });
    return Object.assign(Object.assign({}, container()), { show,
        hide });
};
exports.withModal = withModal;
