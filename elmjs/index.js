const worket = new Worker("./elmworker.js")

let open = "increment"
let close = "decrement"

let state = 0;
let prev_state = 0;


let ele = document.createElement('div')
let button = document.createElement('button');
let root = document.querySelector("#root");
button.textContent = "Click";

button.onclick = () => {
    worket.postMessage('increment');
}

ele.setAttribute("class", "this")

ele.textContent = "This is the text content in here";

root.appendChild(ele);
root.appendChild(button)
