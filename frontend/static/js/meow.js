import Fuzz from "./index.js";
import { $see, $monitor } from './reactivity.js';
export var Hello = function () {
    var _a = $see(0), a = _a[0], seta = _a[1];
    var _b = $see(112), b = _b[0], setb = _b[1];
    $monitor(function () { return console.log("the value in here is ", a(), b()); });
    seta(1);
    return (Fuzz.MakeElement("p", null, "Hello"));
};
export default Hello;
