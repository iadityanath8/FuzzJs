import Fuzz from "./index.js";
import { $see, $monitor } from './reactivity.js'
import Home from "./components/Home.js";

let create = {
    container:{
        color:"blue",
        text_align:"center"
    },
    normal:{
        background:"black"
    }
}

export const Hello = () => {
    return (
        <div style = {create.normal}>
        <p style = {create.container}>Hello</p>   
        </div>
    )
}

export default Hello