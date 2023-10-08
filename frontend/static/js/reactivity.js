
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

        subscription.forEach((fn) => fn())
    }

    return [read, write];
}


export function $monitor(Call$Back) {
    try {
        chek_render = true;
        context.push(Call$Back);
        let i = Call$Back()
        context.pop()
        return i;
    } catch {
        new Error("Cannot call the function")
    }
}

function check_undef(clz) {
    if (clz === undefined) {
        return ''
    }
}

function re_render(clazz, text) {
    if (typeof text == 'function') {
        document.querySelector(clazz).innerText = text()
        return;
    }
    document.querySelector(clazz).innerText = text;
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

export default {loop, $see, $monitor};