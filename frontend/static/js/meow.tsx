import rdom from "./index.js"
import navbar from "./components/new.js"

import { $see, $monitor, check_undef, Deffered_render, FP } from "./reactivity.js"



const onMount = async (call$back) => {
    return () => {
        // render_attr()
        call$back()
    }
}

// depth first search for element find for _render tag in here
// [SLOW]

// experimental and slow api is in here
// [SLOW]
export function Hello(aa) {
    let [a, seta] = $see(0);
    // lazy component
    let element = () => <p class="name">hello state this is me {a().toString()}</p>;


    // pin points update through defering pattern 
    Deffered_render(element)
    return (
        <div class="meow">
            {element()}

            <div class="mo" data-render>
                {navbar(a)}
            </div>

            <button onclick={() => seta(a() + 1, this)}>click me</button>
        </div>
    )
}


export default Hello;