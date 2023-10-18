import Fuzz from "./index.js";
import { $see, $monitor } from './reactivity.js'
import Home from "./components/Home.js";

export const Hello = () => {
    let [a, seta] = $see(0);
    let [b, setb] = $see(112);
    
    $monitor(() => console.log("the value in here is ", a(), b()))

    seta(1);
    return (
        <p>Hello</p>   
    )
}

export default Hello