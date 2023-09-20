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
exports.Config = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const withModal_1 = require("./withModal");
const Config = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const withModalContext = (0, react_1.useContext)(withModal_1.WhithModalContext);
    const [active, setActive] = (0, react_1.useState)(false);
    (0, react_1.useLayoutEffect)(() => {
        withModalContext.setConfig(Object.assign(Object.assign({}, props), { footerRender: () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }));
    }, [props.title, props.disableClose]);
    (0, react_1.useLayoutEffect)(() => {
        requestAnimationFrame(() => setActive(true));
    }, []);
    if ((!withModalContext.footerRef || !withModalContext.footerRef.current) && !active) {
        return (null);
    }
    return (react_dom_1.default.createPortal(typeof children === 'function' ? children(withModalContext) : children, withModalContext.footerRef.current));
};
exports.Config = Config;
