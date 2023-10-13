import rdom from "./index.js"
import navbar from "./components/new.js"

import { $see, $monitor, check_undef, FP, V_domtorender, Rdom_renderer,record } from "./reactivity.js"

// [SLOW]
const onMount = async (call$back) => {
    return () => {
        call$back()
    }
}

// depth first search for element find for _render tag in here
// [SLOW]

// experimental and slow api is in here
// [SLOW]

// typeless class in here
class RDOM_reaction_fn_table {
    private a: any;
    private b: any;

    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

const render_once_again = (jsx_value) => {
    // TODO   
}

const render_through_str_comp = (from_vdom, from_adom) => {

}

export const Hello = () => {
    let [a, seta] = $see(0);
    let [b, setb] = $see(10);
 
    let c;
    $monitor(() => c = () => a()*b())

    $monitor(() => console.log(a(), "is", b(), c()));
    // render should be in here in the jsx in here
    return (      // render
        <div class="meow">
            {record(() => <p class="name"> Hello from my wowrld in here {a().toString()} </p>)}
            <div class="don">
                {record(() => <p class="dont"> Hello this is dont class in here {b().toString()}</p>)}
                {record(() => <p class="normal_class">This is the value in here {c().toString()}</p>)}
                {navbar(a)}
            </div>
            <button onclick={() => seta(a() + 1)}>click me</button>
            <button onclick={() => setb(b() + 1)}>Here to increase</button>
        </div>
    )
}

export default Hello;