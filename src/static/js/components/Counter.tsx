import Fuzz from "../index.js";
import { $see, $monitor, record } from '../reactivity.js'

let style_container = {
    container:{
        display:"flex",
        margin_left:"2em",
        gap:"2em"
    },
}

export const Counter = () => {
    let [count, setcount] = $see(0);
    console.log("Hello world")
    return (
        <div class="inside" style = {style_container.container}>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button onclick = {() => setcount(count() + 1)} type="button" class="btn btn-primary">Increase</button>
                <button onclick = {() => setcount(count() - 1)} type="button" class="btn btn-primary">Decrease</button>
                <button onclick = {() => setcount(count() * 2)} type="button" class="btn btn-primary">Multiply</button>
            </div>

            <button type="button" class="btn btn-primary position-relative">
                Inbox

                <span data-render = "a" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    
                    {record(() => <a data-render = "a11">{count().toString() + "+"}</a>)}
                    
                    <span class="visually-hidden">unread messages</span>
                </span>)
            
            </button>
        </div>
    )
}



export default Counter;