export const rdom = {
    MakeElement(tag_name, props: object, ...childrens: any[]) {
        if (typeof tag_name === 'function'){
            console.log(tag_name)
            return tag_name();
        }
        let element = document.createElement(tag_name);
        

        for (let i in props) {
            const __re_patt = /^on/;
            const pat_test = __re_patt.test(i);

            if (pat_test === true) {
                const EVENT_Dispatched = i.split("on")[1].toString();
                element.addEventListener(EVENT_Dispatched, props[i]);
            } else {
                element.setAttribute(i, props[i])
            }
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

        // Experimental Api
//        element.attr = (text, fn) => {
//            let t = (text.split("on")[1]).toString()
//            element.addEventListener(t, fn);
//            return element;
//        }

        element.children_text = (array) => {
            array.strcontent = [...childrens].join("")
            return element;
        } 

        return element;
    }

}


export default rdom;