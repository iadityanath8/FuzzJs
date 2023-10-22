import Fuzz from "./index.js";
import { $see, record } from './reactivity.js';
var create = {
    container: {
        color: "blue",
        text_align: "center"
    },
    normal: {
        background: "black"
    }
};
Fuzz.Loadassest("/static/js/load.css");
export var Hello = function () {
    var _a = $see(0), state = _a[0], setstate = _a[1];
    var _b = $see(2), second = _b[0], setsecond = _b[1];
    var _c = $see(8), third = _c[0], setthird = _c[1];
    return (Fuzz.MakeElement("div", { class: "load" },
        record(function () { return Fuzz.MakeElement("p", { "data-render": "er" }, state().toString()); }),
        record(function () { return Fuzz.MakeElement("p", { "data-render": "r" }, second().toString()); }),
        record(function () { return Fuzz.MakeElement("p", { "data-render": "q" }, third().toString()); }),
        Fuzz.MakeElement("button", { onclick: function () { setstate(state() + 1); setsecond(second() * 2); setthird(third() + 1); } }, "click me")));
};
export default Hello;
