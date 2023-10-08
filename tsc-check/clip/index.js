"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdom = void 0;
exports.rdom = {
    createElement: function (tag_name, props) {
        var childrens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childrens[_i - 2] = arguments[_i];
        }
        var element = document.createElement(tag_name);
        for (var i in props) {
            element.setAttribute(i, props[i]);
        }
        if (childrens[0] !== undefined) {
            for (var _a = 0, childrens_1 = childrens; _a < childrens_1.length; _a++) {
                var i = childrens_1[_a];
                if (typeof i === 'string') {
                    element.appendChild(document.createTextNode(i));
                }
                else {
                    element.appendChild(i);
                }
            }
        }
        element.on$click = function (fn) {
            element.onclick = fn;
            return element;
        };
        // Experimental Api
        element.attr = function (text, fn) {
            var t = (text.split("on")[1]).toString();
            element.addEventListener(t, fn);
        };
        return element;
    }
};
exports.default = exports.rdom;
