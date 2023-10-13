import rdom from '../index.js';
import { record } from '../reactivity.js';
export var navbar = function (refc) {
    return (rdom.MakeElement("div", { class: "This" },
        rdom.MakeElement("ul", { class: "one_class" },
            rdom.MakeElement("li", null, record(function () { return rdom.MakeElement("a", { href: "/", class: "miui" },
                "Home ",
                refc().toString()); })),
            rdom.MakeElement("li", null,
                rdom.MakeElement("a", { href: "/about" }, "about page")),
            rdom.MakeElement("li", null,
                rdom.MakeElement("a", { href: "/feedback" }, "feedback page is loading")))));
};
export default navbar;
