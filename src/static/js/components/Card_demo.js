var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { $see, record } from '../reactivity.js';
function range(startAt, size) {
    if (startAt === void 0) { startAt = 0; }
    return Array.from(new Array(size), function (x, i) { return i; });
}
var db = [
    {
        id: "1",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! ek alien device ka ",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added",
    },
    {
        id: "2",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! despatiso despatoso  ",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    },
    {
        id: "3",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! KIllu mwoe moew ",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    },
    {
        id: "4",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! Meow",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    },
    {
        id: "5",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! Meow",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    }
];
function setlogic(db, e, setter) {
}
export var Card = function () {
    var _a = $see(db), getdb = _a[0], setdb = _a[1];
    var updatestate = function (id_state) {
        var newState = getdb().map(function (obj) {
            // 👇️ if id equals 2, update country property
            if (obj.added === "not added" && obj.id === id_state) {
                return __assign(__assign({}, obj), { added: "added" });
            }
            else if (obj.added === "added" && obj.id === id_state) {
                return __assign(__assign({}, obj), { added: "not added" });
            }
            // 👇️ otherwise return the object as is
            return obj;
        });
        setdb(newState);
    };
    // console.log(getdb())
    // setdb([...getdb()])
    return (Fuzz.MakeElement.apply(Fuzz, __spreadArray(["div", { class: "container", style: { display: "flex", flex_direction: "row", gap: "2em", flex_wrap: "wrap" } }], range(0, 4).map(function (e) { return Fuzz.MakeElement("div", { class: "card", style: "width: 18rem;" },
        Fuzz.MakeElement("img", { src: getdb()[e].img, class: "card-img-top", alt: "..." }),
        Fuzz.MakeElement("div", { class: "card-body" },
            Fuzz.MakeElement("h5", { class: "card-title" }, getdb()[e].title),
            Fuzz.MakeElement("p", { class: "card-text" }, getdb()[e].desc),
            record(function () { return Fuzz.MakeElement("p", { "data-render": e.toString() + "a" }, getdb()[e].added); }),
            Fuzz.MakeElement("a", { class: "btn btn-primary", onclick: function () { return updatestate(getdb()[e].id); } }, "ho here"))); }), false)));
};
export default Card;
