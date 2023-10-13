
let context = []
let chek_render = false;

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


    const write = (T, th) => {
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

export function re_render(_component_) {
    let clazz = _component_.className;
    let _t = document.querySelector("." + clazz);
    _t.innerText = " "
    _t.innerText = _component_.innerText;
}

export const Deffered_render = (_only_elefunc) => {
    $monitor(() => {
        re_render(_only_elefunc())
    })
}

export default { loop, $see, $monitor, re_render, Deffered_render};