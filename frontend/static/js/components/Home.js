import rdom from '../index.js';
import { $see, record } from '../reactivity.js';
export var Home = function (key) {
    var _a = $see("empty"), text = _a[0], settext = _a[1];
    return (rdom.MakeElement("div", { class: "Iii_a" },
        rdom.MakeElement("div", { class: "mb-3" },
            rdom.MakeElement("label", { for: "exampleFormControlInput1", class: "form-label" }, "Email address"),
            rdom.MakeElement("input", { type: "email", class: "form-control", id: "exampleFormControlInput1", placeholder: "n ame@example.com" })),
        rdom.MakeElement("div", { class: "mb-3" },
            rdom.MakeElement("label", { for: "exampleFormControlTextarea1", class: "form-label" }, "Example textarea"),
            rdom.MakeElement("textarea", { class: "bx61 form-control", id: "t" + key.toString(), rows: "3", oninput: function (e) { return settext(e.target.value); } })),
        rdom.MakeElement("div", { class: "form-floating" },
            record(function () { return rdom.MakeElement("textarea", { class: "eeyc form-control", placeholder: "Leave a comment here", id: "y" + key.toString(), style: "height: 100px" }, text()); }),
            record(function () { return rdom.MakeElement("label", { id: "as" + key.toString(), for: "floatingTextarea2" }, text()); }))));
};
export default Home;
