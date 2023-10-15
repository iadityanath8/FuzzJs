import rdom from "./index.js"
import navbar from "./components/new.js"

import { $see, $monitor, check_undef, FP, V_domtorender, Rdom_renderer, record, Hrouter } from "./reactivity.js"
import Home from "./components/Home.js"
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

// export const Hello = Hrouter({
//     "/":navbar,
//     "/about":Home
// })

let i = 0;
export const Hello = () => {
    return (
        <div>
            {...[1,2,3,4].map((e) => Home(e))}
        </div>
        )
}

export default Hello;