import rdom from "./index.js";
import { $see, $monitor } from "./reactivity.js";
function home(a) {
    $monitor(function () { return console.log("This ->" + a()); });
    return (rdom.MakeElement("div", { class: "Meow" },
        "once again it is just an testing of a rendering paradimn ",
        a().toString()));
}
export var Hello = function () {
    var _a;
    var count = (_a = $see(0), _a[0]), setcount = _a[1];
    return (rdom.MakeElement("div", { class: "__hdev" },
        rdom.MakeElement("p", { class: "__para1" }, " This is my para just to show that we are only rendering the base form "),
        rdom.MakeElement("p", { class: "__para2" }, "This is another p tag so that we can once check that rendering is working "),
        home(count),
        rdom.MakeElement("button", { type: "button", onclick: function () { return setcount(count() + 1); } }, " + ")));
};
export default Hello;
