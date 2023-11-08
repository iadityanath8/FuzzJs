import Fuzz from './index.js'

let context = undefined
let chek_render = false;

export var V_domtorender = {
    v_vak: undefined
};

// TODO: WORK IN PROGRESS
export function $see(T) {
    let f__vak = T;
    let subscription = new Set() // to avoid the duplicates thats why we are using the Set
    let passer = undefined;

    const read = () => {
        if (context !== undefined) {
            subscription.add(context)
        }
        return f__vak;
    }


    const write = (T) => {
        if (typeof T == 'function') {
            f__vak = T(f__vak);
        } else {
            f__vak = T;
        }
        subscription.forEach((fn) => fn()) //slow unsafe operation
    }

    return [read, write];
}

// inefficeient at doing something that dom can do
/*EXPERIMENTAL FOR NOW ONMOUNT IS ENOUGH*/async function $monitor__async(Call$Back) {
    return () => {
        try {
            chek_render = true;
            context = Call$Back;
            let i = Call$Back()
            context = undefined;
            return i;
        } catch {
            new Error("INFO:  Cannot call the function")
        }
    }
}

export function $monitor(Call$Back) {
    try {
        chek_render = true;
        context = Call$Back;
        let i = Call$Back()
        context = undefined;
        return i;
    } catch {
        new Error("INFO:  Cannot call the function")
    }
}

export function $Memo(fn) {
    const [s, set] = $see();
    $monitor(() => set(fn()));
    return s;
}

export function check_undef(clz) {
    if (clz === undefined) {
        return ''
    }
}

// function re_render(clazz, _component_) {
//     // if (typeof text == 'function') {
//     //     document.querySelector(clazz).appendChild(_component_)
//     //     return;
//     // }if (typeof text == 'string'){
//     //     const create_node = document.createTextNode(_component_);
//     //     document.querySelector(clazz).appendChild(create_node)
//     // }else{
//     //     throw new Error("cannot render the DOM")
//     // }

//     try {
//         // document.getElementsByClassName(clazz).innerText = "Je;;p";
//         console.log(typeof _component_)
//         const c = document.createTextNode("Hello");
//         console.log(document.querySelector('.name'))   //.appendChild(c) //.appendChild(c);
//     } catch (error) {
//         console.log("ERROR: -> ", error);
//     }
// }

export function* loop(times, fn) {
    if (typeof times == 'object') {
        yield times.map(fn)
    } else if (typeof times == 'number') {
        for (let i = 0; i < times; i++) {
            yield fn()
        }
    }
}


/**
 *  @deprecated Soon Router will be erdicated soon with the implmenttion of Browser Router till then use Hash Router instead
 */
function Router(routes) {
    // let result = div();

    result.SyncChanges = () => {
        while (this.firstChild) {
            this.removeChild(this.lastChild)
        }
    }

    return result;
}


/**
 * Represents a book.
 * onMunt is a async function which sees for if the html has loaded into the dom an dthen rerun the closure
 * @param {() => val} Call$Back  A callback function to be provided.
 */
export const onMount = async (call$back) => {
    return () => {
        call$back()
    }
}


/**
 * A basic Hash router implementation. 
 * Upcomming will be a Browser router for handling querty params 
 * 
 * @param {object} routes 
 * @returns {object} where object -> HtmlElement + my version in to it.
 */
export function Hrouter(routes) {

    let result = Fuzz.MakeElement("div", { class: "__router_mclass" });

    result.SyncChanges = () => {
        let hash = (window.location.hash).split("#")[1];
        if (hash === undefined || hash == "/") {
            // result.innerText = ''

            while (result.firstChild) {
                result.removeChild(result.lastChild)
            }

            result.appendChild(routes["/"]())
        }
        else if (hash in routes) {
            // result.innerText = ' ';
            while (result.firstChild) {
                result.removeChild(result.lastChild)
            }
            // console.log(routes["/"]())
            result.appendChild(routes["/"]())
            result.appendChild(routes[hash]())
        }
    }

    // console.log("aa", result);
    return result;
}


const __dfs = (ele_sr, element) => {

    // console.log(ele_sr.getAttribute('__render'))
    for (let i = 0; i < ele_sr.childNodes.length; i++) {

        if (ele_sr.dataset.render) {
            const eleclass = ele_sr.className;
            re_render("." + eleclass, element)
        }

        __dfs(ele_sr.childNodes[i], element)
    }
}

// export const render_attr = (element) => {
//     let ele = document.querySelector(".meow");
//     __dfs(ele, element);
// }

// export const render_attr = (a) => {

// }

/**
 * 
 * @param {Deprecated} re_render1
 */
// export function re_render1(clazz, _component_) {
//     let t = document.querySelector(clazz);
//     t.innerText = " ";
//     t.innerText = _component_.innerText;
// }

class Render_components__methods {
    constructor() {

    }

    re_render(_component_) {
        console.log(_component_)
        let clazz = _component_.className;
        let _t = document.querySelector("." + clazz);
        _t.innertext = " "
        _t.innerHTML = _component_.innertext;
    }

    render_text(clazz, node) {
        document.querySelector(clazz).innerHTML = node; // unsafe operation incomming in here
        // document.querySelector(clazz).appendChild(node)
    }

    Render_DOm(_component_, _domnode) {
        _domnode.appendChild(_component_)
    }

    Deffered_render(_only_elefunc) {
        $monitor(() => {
            this.re_render(_only_elefunc())
        })
    }

}



// interface DEV_type {
//     strcontent: string
// }


let string_val /*DEV_type[]*/ = []
let pata      /*DEV_type[]*/ = []
var glob_id_index /*Number*/ = -1

let main_cache = {}       // object should be enough rather than calling a function in here
/** 
 * The main focus for the next opening of the project will be the rendering and most on the improvement of the record function 
 * the record function is the main backbone of rendering that happens in the FuzzJs also improvement like "no need of data-render attribute", "avoid extra rendering work ", "and improvement of signa functions such as $see and $monitor"
*/


export const record = (conVal) => {
    glob_id_index++;
    string_val.push({ strcontent: "" })
    pata.push({ strcontent: "" })
    let hm = new Map();

    // a little bit overhead but still super OK
    try {
        return $monitor(() => {
            let func_val = conVal();

            var common_state = glob_id_index;
            const cls_name = func_val.dataset.render;

            if (hm.has(cls_name) === false) {
                hm.set(cls_name, common_state);
            }
            // func_val.children_text(string_val[hm.get(cls_name)]);

            const t = `[data-render="${cls_name}"]`
            const r = document.querySelector(t);

            if (r == null) {
                string_val[hm.get(cls_name)].strcontent = ""
            } else {
                string_val[hm.get(cls_name)].strcontent = r.textContent;
                func_val.children_text(pata[hm.get(cls_name)])
                if (string_val[hm.get(cls_name)].strcontent === pata[hm.get(cls_name)].strcontent) {
                    
                }else{
                    Fuzz_renderer.render_text(t, pata[hm.get(cls_name)].strcontent);
                    console.log(string_val, pata);
                }
            }
            // string_val[hm.get(cls_name)].strcontent =
            // let a =  document.querySelector(t).textContent

            // console.log(a);

            // func_val.children_text(pata[hm.get(cls_name)]);

            // console.log("a",string_val);
            // console.log("b", pata)

            // deprecated ------------------- 
            // console.log("This is me in here", string_val.strcontent.join(""))
            // if (string_val[hm.get(cls_name)].strcontent.length === 0) {
            //     func_val.children_text(string_val[hm.get(cls_name)]);
            // }
            // else {
            //     func_val.children_text(pata[hm.get(cls_name)]);
            //     let op = document.createTextNode(pata[hm.get(cls_name)].strcontent);
            //     // console.log(pata[hm.get(cls_name)].strcontent)
            //     const t = `[data-render="${cls_name}"]`
            //     let r = document.querySelector(t).textContent;

            //     Fuzz_renderer.render_text(t, pata[hm.get(cls_name)].strcontent);
            // }

            return func_val
        }
        )
    } catch (err) {
        console.log(err)
    }
    // render_through_str_comp(string_val, )
}



// sort of tree diff but still highly experimental api.
export const new_rec = (htmlvaluecomponent) => {
    // only render it with new value in here 
    return $monitor(() => {
        let call = htmlvaluecomponent();

        console.log(call);

        let selector = document.querySelector(call.className);

        if (selector !== null && selector.className === call.className && call.innerHTML !== selector.innerHTML) {
            selector.innerHTML = call.innerHTML;
            console.log("wow", call.innerHTML);
            // console.log("selector", selector.innerHTML);
        }
        return call;
    })
}

export const Fuzz_renderer = new Render_components__methods()
Object.freeze(Fuzz_renderer);

export default { $see, $monitor, Fuzz_renderer, record, Hrouter, onMount, $Memo, new_rec };
