var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Fuzz = /** @class */ (function () {
    function Fuzz() {
    }
    Fuzz.BuildCss = function (element, i, props) {
        var str_val = "";
        for (var k in props[i]) {
            var split_val = k.split("_");
            var old_val = k;
            if (split_val.length > 1) {
                k = split_val.join("-");
            }
            str_val += k + ":" + props[i][old_val] + ";";
        }
        element.setAttribute(i, str_val);
    };
    Fuzz.MakeElement = function (tag_name, props) {
        var childrens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childrens[_i - 2] = arguments[_i];
        }
        if (typeof tag_name === 'function') {
            console.log(childrens);
            return tag_name(props);
        }
        var element = document.createElement(tag_name);
        // NO EH
        for (var i in props) {
            var __re_patt = /^on/;
            var pat_test = __re_patt.test(i);
            if (typeof props[i] === 'object') {
                // Build Css
                // let str_val = "";
                // for (let k in props[i]) {
                //     const split_val = k.split("_");
                //     const old_val = k;
                //     if (split_val.length > 1) {
                //         k = split_val.join("-");
                //     }
                //     str_val += k + ":" + props[i][old_val] + ";";
                // }
                // element.setAttribute(i, str_val);
                // Build Css
                this.BuildCss(element, i, props);
            }
            else {
                if (pat_test === true) {
                    var EVENT_Dispatched = i.split("on")[1].toString();
                    element.addEventListener(EVENT_Dispatched, props[i]);
                }
                else {
                    element.setAttribute(i, props[i]);
                }
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
            if (typeof childrens[0] === 'string' || typeof childrens === 'string') {
                array.strcontent = __spreadArray([], childrens, true).join("");
                return element;
            }
            else if (typeof childrens === 'object') {
                array.strcontent = "";
                for (var i in childrens) {
                    array.strcontent += childrens[i].outerHTML;
                }
                return element;
            }
        };
        return element;
    };
    // Needs a testing 
    Fuzz.BuildCss_from_file = function (str) {
        var element = document.getElementsByTagName('style');
        if (element.length == 0) {
            var ple = document.createElement('style');
            ple.innerHTML = str;
            document.body.appendChild(ple);
        }
        else {
            var __textval = document.createTextNode(str);
            element.item(0).appendChild(__textval);
        }
    };
    // DEP NEXT WORK LATER
    Fuzz.Loadassest = function (path_to_css) {
        var _this = this;
        fetch(path_to_css).then(function (res) { return res.text(); }).then(function (_y) {
            _this.BuildCss_from_file(_y);
        });
    };
    Fuzz.range = function (startAt, size) {
        if (startAt === void 0) { startAt = 0; }
        return Array.from(new Array(size), function (x, i) { return i; });
    };
    Fuzz.jtoString = function (obj) { return Object.entries(obj).map(function (_a) {
        var k = _a[0], v = _a[1];
        return "".concat(k, ": ").concat(v);
    }).join(', '); };
    return Fuzz;
}());
export { Fuzz };
// export const Stylesheet = {
//     CreateSheet(objobj){s     
//     }
// }
// export const Fuzz = new __Fuzz_internals();
// Object.freeze(Fuzz)
export default Fuzz;
