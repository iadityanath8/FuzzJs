import Fuzz from "./index.js";
import { $see, $monitor, Loadassest, record } from './reactivity.js'
import Home from "./components/Home.js";

let create = {
    container: {
        color: "blue",
        text_align: "center"
    },
    normal: {
        background: "black"
    }
}


Fuzz.Loadassest("/static/js/load.css")
export const Hello = () => {
    let [state, setstate] = $see(0);
    let [second, setsecond] = $see(2);
    let [third, setthird] = $see(8);
    return (
        <div class="load">

            {record(() => <p data-render = "er">{state().toString()}</p>)}

            {record(() => <p data-render = "r">{second().toString()}</p>)}
            
            {record(() => <p data-render = "q">{third().toString()}</p>)}
            
            <button onclick={() => { setstate(state() + 1); setsecond(second()*2); setthird(third() + 1) }}>click me</button>
        </div>
    )
}

export default Hello