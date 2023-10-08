"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function Hello(name) {
    return (index_1.default.createElement("div", { class: "asd", onclick: function () { return console.log("Hello world"); } },
        "Hello ",
        name,
        index_1.default.createElement("div", null, " Hello Nested "),
        index_1.default.createElement("div", null, " Hello Nested 2")));
}
function log(html) {
    console.log(html);
}
log(Hello("World"));
