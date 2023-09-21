"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const Provider_1 = require("./Provider");
const style_module_css_1 = __importDefault(require("../assets/css/style.module.css"));
const Container = (0, react_1.forwardRef)((props, ref) => {
    const { children, style, className, name, title, disableClose, theme = 'light', effect = 'scale', render, footerRender, onHide } = props;
    const containerRef = (0, react_1.useRef)(null);
    const footerRef = (0, react_1.useRef)(null);
    const [isShow, setShow] = (0, react_1.useState)(false);
    const providerContext = (0, react_1.useContext)(Provider_1.ProviderContext);
    const show = () => {
        setShow(true);
    };
    const _hide = () => {
        const element = containerRef.current;
        if (!element) {
            return;
        }
        element.ontransitionend = () => {
            setShow(false);
        };
        element === null || element === void 0 ? void 0 : element.classList.remove(style_module_css_1.default['active']);
    };
    const hide = () => {
        if (disableClose)
            return;
        _hide();
    };
    (0, react_1.useEffect)(() => {
        requestAnimationFrame(() => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.classList.add(style_module_css_1.default['active']); });
        if (!isShow) {
            onHide === null || onHide === void 0 ? void 0 : onHide();
        }
    }, [isShow]);
    (0, react_1.useLayoutEffect)(() => {
        providerContext.push(name, show, _hide);
    }, []);
    (0, react_1.useImperativeHandle)(ref, () => ({
        show,
        hide,
        footerRef
    }));
    if (!providerContext.modals || !providerContext.modals.current) {
        return (null);
    }
    const renderProps = Object.assign(Object.assign({}, props), { show,
        hide,
        footerRef });
    return react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isShow &&
            (0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['container'] + ' ' + style_module_css_1.default[theme] + ' ' + style_module_css_1.default['effect-' + effect], ref: containerRef, children: [(0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['background'], onClick: hide }), (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['modal-container'], children: typeof render === 'function' ? render(renderProps) :
                            (0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['modal'] + (className ? ' ' + className : ''), style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['header'], children: [(0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['text'], children: title }), (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['close'], onClick: hide })] }), (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['content'], children: children }), footerRender && (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['footer'], ref: footerRef, children: typeof footerRender === 'function' ? footerRender(renderProps) : footerRender })] }) })] }) }), providerContext.modals.current);
});
exports.Container = Container;
