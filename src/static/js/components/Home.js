import Fuzz from "../index.js";
var ss = {
    fcs: {
        display: "flex",
        justify_content: "center",
        align_items: "center",
        height: "100vh"
    },
    thisc: {
        color: "violet"
    },
    ffc: {
        width: "331px",
        height: "361px"
    }
};
Fuzz.Loadassest("/static/js/components/test.css");
export var Home = function () {
    return (Fuzz.MakeElement("div", null,
        Fuzz.MakeElement("div", { style: ss.fcs },
            Fuzz.MakeElement("p", { class: "This" },
                Fuzz.MakeElement("img", { src: "/static/js/components/jebaited.jpg", alt: "", style: ss.ffc }),
                "Hello world from my home in here"))));
};
export default Home;
