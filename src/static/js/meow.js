import Fuzz from "./index.js";
var create = {
    container: {
        color: "blue",
        text_align: "center"
    },
    normal: {
        background: "black"
    }
};
export var Hello = function () {
    return (Fuzz.MakeElement("div", { style: create.normal },
        Fuzz.MakeElement("p", { style: create.container }, "Hello")));
};
export default Hello;
