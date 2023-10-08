import rdom from "./index.js"
import {$see, $monitor} from "./reactivity.js"

function home(a){
    $monitor(() => console.log("This ->" + a()))
    return (
        <div class="Meow">
            once again it is just an testing of a rendering paradimn {a().toString()}
        </div>
    );
}

export let  Hello = () => {
    let [count, setcount] = $see(0);
    return (
        <div class="__hdev"> 
            <p class="__para1"> This is my para just to show that we are only rendering the base form </p>
            <p class="__para2">This is another p tag so that we can once check that rendering is working </p>
            
            
            {home(count)}
            
            <button type="button" onclick={() => setcount(count() +1)}> + </button>
        </div>
    )
}

export default Hello;