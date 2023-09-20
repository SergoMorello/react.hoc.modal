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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalConfig = exports.ModalProvider = exports.useModal = exports.withModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Container_1 = require("./Container");
const Config_1 = require("./Config");
Object.defineProperty(exports, "ModalConfig", { enumerable: true, get: function () { return Config_1.Config; } });
const Provider_1 = require("./Provider");
Object.defineProperty(exports, "ModalProvider", { enumerable: true, get: function () { return Provider_1.Provider; } });
const withModal_1 = require("./withModal");
Object.defineProperty(exports, "withModal", { enumerable: true, get: function () { return withModal_1.withModal; } });
const useModal_1 = require("./useModal");
Object.defineProperty(exports, "useModal", { enumerable: true, get: function () { return useModal_1.useModal; } });
const Modal = Object.assign(Object.assign({}, (0, react_1.forwardRef)((_a, ref) => {
    var args = __rest(_a, []);
    return (0, jsx_runtime_1.jsx)(Container_1.Container, Object.assign({}, args, { ref: ref }));
})), { Provider: Provider_1.Provider,
    Config: Config_1.Config, show: (name) => Provider_1.staticAction.current.show(name), hide: (name) => Provider_1.staticAction.current.hide(name), withModal: withModal_1.withModal,
    useModal: useModal_1.useModal });
exports.default = Modal;
