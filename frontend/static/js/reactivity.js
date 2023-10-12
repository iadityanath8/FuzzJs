
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
            context.push(Call$Back);
            let i = Call$Back()
            context.pop()
            return i;
        } catch {
            new Error("INFO:  Cannot call the function")
        }
    }
}

export function $monitor(Call$Back){
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

function re_render(clazz, _component_) {
    // if (typeof text == 'function') {
    //     document.querySelector(clazz).appendChild(_component_)
    //     return;
    // }if (typeof text == 'string'){
    //     const create_node = document.createTextNode(_component_);
    //     document.querySelector(clazz).appendChild(create_node)
    // }else{
    //     throw new Error("cannot render the DOM")
    // }

    try {
        // document.getElementsByClassName(clazz).innerText = "Je;;p";
        console.log(typeof _component_)
        const c = document.createTextNode("Hello");
        console.log(document.querySelector('.name'))   //.appendChild(c) //.appendChild(c);
    } catch (error) {
        console.log("ERROR: -> ", error);
    }
}

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

export default { loop, $see, $monitor, check_undef, re_render };