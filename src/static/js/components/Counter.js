import Fuzz from "../index.js";
import { $see, record } from '../reactivity.js';
var style_container = {
    container: {
        display: "flex",
        margin_left: "2em",
        gap: "2em"
    },
};
export var Counter = function () {
    var _a = $see(0), count = _a[0], setcount = _a[1];
    console.log("Hello world");
    return (Fuzz.MakeElement("div", { class: "inside", style: style_container.container },
        Fuzz.MakeElement("div", { class: "btn-group", role: "group", "aria-label": "Basic example" },
            Fuzz.MakeElement("button", { onclick: function () { return setcount(count() + 1); }, type: "button", class: "btn btn-primary" }, "Increase"),
            Fuzz.MakeElement("button", { onclick: function () { return setcount(count() - 1); }, type: "button", class: "btn btn-primary" }, "Decrease"),
            Fuzz.MakeElement("button", { onclick: function () { return setcount(count() * 2); }, type: "button", class: "btn btn-primary" }, "Multiply")),
        Fuzz.MakeElement("button", { type: "button", class: "btn btn-primary position-relative" },
            "Inbox",
            Fuzz.MakeElement("span", { "data-render": "a", class: "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" },
                record(function () { return Fuzz.MakeElement("a", { "data-render": "a11" }, count().toString() + "+"); }),
                Fuzz.MakeElement("span", { class: "visually-hidden" }, "unread messages")),
            ")")));
};
export default Counter;
