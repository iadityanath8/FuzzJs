import rdom from "./index.js"
import { $see, $monitor, check_undef } from "./reactivity.js"

const __dfs = (ele_sr) => {
    console.log(ele_sr)

    // console.log(ele_sr.getAttribute('__render'))
    for (let i = 0; i < ele_sr.childNodes.length; i++) {

        if (ele_sr.dataset.render) {
            const eleclass = ele_sr.className;
            console.log(eleclass);
        }

        __dfs(ele_sr.childNodes[i])
    }
}

export const render_attr = () => {
    let ele = document.querySelector(".meow");
    __dfs(ele);
}


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

export function re_render(clazz, _component_) {
    let t = document.querySelector(".meow");
    console.log(t)
}


export const Hello = () => {
    let [a, seta] = $see(0);

    $monitor(() => {
        let r = document.querySelector('.meow');
        console.log(r)
    })

    return (
        <div class="meow">
            <p class="name"> Name is my  </p>

            <div class="mo" data-render>
                <p class='mop'>This is my nested component</p>
            </div>

            <button onclick={() => seta(a() + 1)}>click me</button>
        </div>
    )
}


export default Hello;