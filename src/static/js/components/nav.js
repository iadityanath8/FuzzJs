var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Fuzz from "../index.js";
import { $see, record, onMount } from '../reactivity.js';
var fake_db = [
    {
        id: 1,
        name: "Aditya"
    },
    {
        id: 2,
        name: "Aman"
    },
    {
        id: 3,
        name: "Adeet"
    },
    {
        id: 4,
        name: "Laksh"
    },
    {
        id: 5,
        name: "Lakahn"
    },
    {
        id: 6,
        name: "Pravesh"
    },
    {
        id: 7,
        name: "Paras"
    },
    {
        id: 8,
        name: "Pradeep"
    },
    {
        id: 9,
        name: "Ember"
    },
    {
        id: 10,
        name: "Johnny"
    },
];
// {...range(0,len).map((e) => record(() => <p data-render={"a" + e}>{
//     real_fake()[e] === undefined?"":real_fake()[e].name    
// }</p>))}
var For = function (props) {
    console.log("Hello world", props.key);
};
export var Navbar = function () {
    var _a = $see(""), result = _a[0], setresult = _a[1];
    // react way not an optimized ideabut does the job
    var _b = $see(fake_db), real_fake = _b[0], real_fakeset = _b[1];
    var len = real_fake().length;
    onMount(function () {
        var r = document.querySelector('.navContainer');
        console.log(r);
    }).then(function (res) { return res(); });
    return (Fuzz.MakeElement("div", { class: "navContainer" },
        Fuzz.MakeElement("nav", { class: "navbar navbar-light bg-light" },
            Fuzz.MakeElement("div", { class: "container-fluid" },
                Fuzz.MakeElement("form", { class: "d-flex" },
                    Fuzz.MakeElement("input", { class: "form-control me-2", id: "a_val", type: " search", placeholder: "Search", "aria-label": "Search", oninput: function () {
                            var val = document.getElementById('a_val').value;
                            real_fakeset(fake_db.filter(function (e) { return e.name.startsWith(val); }));
                        } }),
                    Fuzz.MakeElement("button", { class: "btn btn-outline-success", type: "submit" }, "Search")))),
        Fuzz.MakeElement.apply(Fuzz, __spreadArray(["div", { class: "SearchResultFilter", style: { margin_top: "2em" } }], Fuzz.range(0, len).map(function (e) { return record(function () { return Fuzz.MakeElement("p", { class: "a", "data-render": e.toString() + "a" }, real_fake()[e] === undefined ? "" : real_fake()[e].name); }); }), false))));
};
export default Navbar;
{ /* <For key='2'>
                        {(i, j) => {
                            <p>Hekko</p>
                        }}
                    </For> */
}
