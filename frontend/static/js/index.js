var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var rdom = {
    MakeElement: function (tag_name, props) {
        var childrens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childrens[_i - 2] = arguments[_i];
        }
        var element = document.createElement(tag_name);
        for (var i in props) {
            var __re_patt = /^on/;
            var pat_test = __re_patt.test(i);
            if (pat_test === true) {
                var EVENT_Dispatched = i.split("on")[1].toString();
                element.addEventListener(EVENT_Dispatched, props[i]);
            }
            else {
                element.setAttribute(i, props[i]);
            }
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
        // Experimental Api
        //        element.attr = (text, fn) => {
        //            let t = (text.split("on")[1]).toString()
        //            element.addEventListener(t, fn);
        //            return element;
        //        }
        element.children_text = function (array) {
            array.strcontent = __spreadArray([], childrens, true).join("");
            return element;
        };
        return element;
    }
};
export default rdom;
