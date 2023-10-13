
let context = []
let chek_render = false;

export var V_domtorender = {
    v_vak: undefined
};

export function $see(T) {
    let f__vak = T;
    let subscription = new Set() // to avoid the duplicates thats why we are using the Set
    let passer = undefined;

    const read = () => {
        if (context[context.length - 1] !== undefined) {
            subscription.add(context[context.length - 1])
        }
        return f__vak;
    }


    const write = (T) => {
        if (typeof T == 'function') {
            f__vak = T(f__vak);
        } else {
            f__vak = T;
        }
        // console.log(th);
        subscription.forEach((fn) => fn()) //slow unsafe operation
    }

    return [read, write];
}

// inefficeient at doing something that dom can do
/*EXPERIMENTAL FOR NOW ONMOUNT IS ENOUGH*/async function $monitor__async(Call$Back) {
    return () => {
        try {
            chek_render = true;
            context.push(Call$Back);
            let i = Call$Back()
            context.pop()
            return i;
        } catch {
            new Error("INFO:  Cannot call the function")
        }
    }
}

export function $monitor(Call$Back) {
    try {
        chek_render = true;
        context.push(Call$Back);
        let i = Call$Back()
        context.pop()
        return i;
    } catch {
        new Error("INFO:  Cannot call the function")
    }
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
 * @param {() => val} Call$Back  A callback function to be provided.
 */
export const onMount = async (Call$Back) => {
    // Handling promises automatically

}

function Hrouter(routes) {

    let result = div({ class: "__router_mclass" })

    result.SyncChanges = () => {
        let hash = (window.location.hash).split("#")[1];
        console.log(hash)
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
            result.appendChild(routes["/"]())
            result.appendChild(routes[hash]())
        }
    }

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
        let clazz = _component_.className;
        let _t = document.querySelector("." + clazz);
        _t.innerText = " "
        _t.innerText = _component_.innerText;
    }

    render_text(clazz, node) {
        document.querySelector(clazz).innerText = " "; // unsafe operation incomming in here
        document.querySelector(clazz).appendChild(node)
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


export var glob_id_index =     -1

// interface DEV_type {
//     strcontent: string
// }

let string_val /*DEV_type[]*/ = []

let pata      /*DEV_type[]*/ = []


export const record = (conVal) => {
    glob_id_index++;

    string_val.push({ strcontent: "" })
    pata.push({ strcontent: "" })

    // a little bit overhead but still super OK
    return $monitor(() => {
        let func_val = conVal();
        let cls_name = func_val.className;
        // console.log(glob_id_index)
        // state for caching the output

        // console.log("This is me in here", string_val.strcontent.join(""))
        if (string_val[glob_id_index].strcontent.length === 0) {
            func_val.children_text(string_val[glob_id_index]); // when rendered the component in here
        } else if (string_val[glob_id_index].strcontent === pata[glob_id_index].strcontent) {
            console.log("WOOOOOOOO")
        }
        else {
            func_val.children_text(pata[glob_id_index]);
            console.log(glob_id_index)
            let op = document.createTextNode(pata[glob_id_index].strcontent);
            Rdom_renderer.render_text("." + cls_name, op);
            // string_val.strcontent = pata.strcontent;
        }

        return func_val
    }
    )
    // render_through_str_comp(string_val, )
}


export const Rdom_renderer = new Render_components__methods()
Object.freeze(Rdom_renderer);

export default { loop, $see, $monitor, Rdom_renderer, V_domtorender, record };