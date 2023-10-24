import Fuzz from "../index.js";
var stylesheet = {
    sep: {
        margin_bottom: "2em"
    },
};
export var Home = function () {
    return (Fuzz.MakeElement("nav", { class: "navbar navbar-expand-lg navbar-light bg-light", style: stylesheet.sep },
        Fuzz.MakeElement("div", { class: "container-fluid" },
            Fuzz.MakeElement("a", { class: "navbar-brand", href: "#/" }, "Navbar"),
            Fuzz.MakeElement("button", { class: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                Fuzz.MakeElement("span", { class: "navbar-toggler-icon" })),
            Fuzz.MakeElement("div", { class: "collapse navbar-collapse", id: "navbarNav" },
                Fuzz.MakeElement("ul", { class: "navbar-nav" },
                    Fuzz.MakeElement("li", { class: "nav-item" },
                        Fuzz.MakeElement("a", { class: "nav-link active", "aria-current": "page", href: "#/" }, "Home")),
                    Fuzz.MakeElement("li", { class: "nav-item" },
                        Fuzz.MakeElement("a", { class: "nav-link active", href: "#/Counter" }, "Counter")),
                    Fuzz.MakeElement("li", { class: "nav-item" },
                        Fuzz.MakeElement("a", { class: "nav-link", href: "#/nav" }, "Go to search")),
                    Fuzz.MakeElement("li", { class: "nav-item" },
                        Fuzz.MakeElement("a", { class: "nav-link", href: "#/Shop" }, "Shop"))))))
    // <p>Down in here</p>
    );
};
export default Home;
