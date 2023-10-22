export class Fuzz {
    constructor() {

    }

    private static BuildCss(element, i, props) {
        let str_val = "";
        for (let k in props[i]) {
            const split_val = k.split("_");
            const old_val = k;
            if (split_val.length > 1) {
                k = split_val.join("-");
            }
            str_val += k + ":" + props[i][old_val] + ";";
        }
        element.setAttribute(i, str_val)
    }

    public static MakeElement(tag_name, props: object, ...childrens: any[]) {

        if (typeof tag_name === 'function') {
            return tag_name(props);
        }

        let element = document.createElement(tag_name);

        // NO EH
        for (let i in props) {
            const __re_patt = /^on/;
            const pat_test = __re_patt.test(i);

            if (typeof props[i] === 'object') {
                // Build Css
                // let str_val = "";
                // for (let k in props[i]) {
                //     const split_val = k.split("_");
                //     const old_val = k;
                //     if (split_val.length > 1) {
                //         k = split_val.join("-");
                //     }
                //     str_val += k + ":" + props[i][old_val] + ";";
                // }
                // element.setAttribute(i, str_val);
                // Build Css
                this.BuildCss(element, i, props);
            } else {
                if (pat_test === true) {
                    const EVENT_Dispatched = i.split("on")[1].toString();
                    element.addEventListener(EVENT_Dispatched, props[i]);
                } else {
                    element.setAttribute(i, props[i])
                }
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


    // Needs a testing 
    public static BuildCss_from_file(str) {
        let element = document.getElementsByTagName('style');
        if (element.length == 0) {
            let ple = document.createElement('style');
            ple.innerHTML = str;
            document.body.appendChild(ple);
        } else {
            let __textval = document.createTextNode(str)
            element.item(0).appendChild(__textval);
        }
    }

    // DEP NEXT WORK LATER
    public static Loadassest(path_to_css: string) {
        fetch(path_to_css).then((res) => res.text()).then((_y) => {
            this.BuildCss_from_file(_y);
        }
        );
    }
}

// export const Stylesheet = {
//     CreateSheet(objobj){s     
//     }
// }

// export const Fuzz = new __Fuzz_internals();

// Object.freeze(Fuzz)

export default Fuzz;