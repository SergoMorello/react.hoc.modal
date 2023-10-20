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
const html_viewport_1 = __importDefault(require("html-viewport"));
const Container = (0, react_1.forwardRef)((props, ref) => {
    const { children, style, className, name, title, disableClose = false, backgroundClose = true, hideCloseButton = false, theme = 'light', effect = 'scale', render, footerRender, onHide } = props;
    const containerRef = (0, react_1.useRef)(null);
    const footerRef = (0, react_1.useRef)(null);
    const showStatus = (0, react_1.useRef)(false);
    const [isShow, setShow] = (0, react_1.useState)(false);
    const providerContext = (0, react_1.useContext)(Provider_1.ProviderContext);
    const show = () => {
        setShow(true);
    };
    const _hide = () => {
        const element = containerRef.current;
        if (!element)
            return;
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
    const backgroundHide = () => {
        if (!backgroundClose)
            return;
        hide();
    };
    const blockScroll = (status) => {
        if (!document.body)
            return;
        const classBody = document.body.classList;
        status ? classBody.add(style_module_css_1.default['block-scroll']) : classBody.remove(style_module_css_1.default['block-scroll']);
    };
    const handleEscape = (e) => {
        if (e.code === 'Escape') {
            hide();
        }
    };
    const resetFocus = (e) => {
        if (!(e.relatedTarget && e.relatedTarget.closest('.' + style_module_css_1.default['modal-container']))) {
            e.currentTarget.focus();
        }
    };
    (0, react_1.useEffect)(() => {
        showStatus.current = isShow;
        const viewport = new html_viewport_1.default;
        if (isShow) {
            viewport.add('interactive-widget', 'resizes-content');
            requestAnimationFrame(() => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.classList.add(style_module_css_1.default['active']); });
        }
        else {
            viewport.remove('interactive-widget');
            onHide === null || onHide === void 0 ? void 0 : onHide();
        }
        requestAnimationFrame(() => {
            if (!isShow && providerContext.count() > 0)
                return;
            blockScroll(isShow);
        });
    }, [isShow]);
    /**
     * Unset background cursor pointer
     */
    (0, react_1.useLayoutEffect)(() => {
        if (!containerRef.current)
            return;
        const container = containerRef.current;
        if (backgroundClose)
            container === null || container === void 0 ? void 0 : container.classList.remove(style_module_css_1.default['cursor-unset']);
        else
            container === null || container === void 0 ? void 0 : container.classList.add(style_module_css_1.default['cursor-unset']);
    }, [backgroundClose]);
    (0, react_1.useLayoutEffect)(() => {
        providerContext.push(name, {
            show,
            hide: _hide,
            showStatus
        });
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
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
            (0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['container'] + ' ' + style_module_css_1.default[theme] + ' ' + style_module_css_1.default['effect-' + effect], ref: containerRef, children: [(0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['background'], onClick: backgroundHide }), (0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['modal-container'], tabIndex: 1, role: "dialog", children: [(typeof render === 'function' && !hideCloseButton) &&
                                (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['close-block'], onClick: backgroundHide, children: (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['close'] + ' ' + style_module_css_1.default['large'], onClick: hide }) }), typeof render === 'function' ? render(renderProps) :
                                (0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['modal'] + (className ? ' ' + className : ''), style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: style_module_css_1.default['header'], children: [(0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['text'], children: title }), (!hideCloseButton) && (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['close'], onClick: hide })] }), (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['content'], children: children }), footerRender && (0, jsx_runtime_1.jsx)("div", { className: style_module_css_1.default['footer'], ref: footerRef, children: typeof footerRender === 'function' ? footerRender(renderProps) : footerRender })] })] })] }) }), providerContext.modals.current);
});
exports.Container = Container;
