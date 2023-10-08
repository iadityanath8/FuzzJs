

export const rdom = {
    createElement(tag_name, props, ...childrens) {
        let element = document.createElement(tag_name);

        for (let i in props) {
            element.setAttribute(i, props[i])
        }

        if (childrens[0] !== undefined) {
            for (let i of childrens) {
                if (typeof i === 'string') {
                    element.appendChild(document.createTextNode(i))
                } else {
                    element.appendChild(i)
                }
            }
        }

        element.on$click = (fn) => {
            element.onclick = fn
            return element
        }

        // Experimental Api
        element.attr = (text, fn) => {
            let t = (text.split("on")[1]).toString()
            element.addEventListener(t, fn);
        }

        return element;
    }

}

export default rdom;