import { Hello } from './meow.js';
import { Rdom_renderer, $monitor } from './reactivity.js';
// import {home} from './rdom.js';


// mainapp.SyncChanges()
// $monitor(() => {
//     // Removing the nodes in here
//     document.querySelector("#main").innerHTML = " ";
// });

Rdom_renderer.Render_DOm(Hello(), document.getElementById("main"))

// window.onhashchange = mainapp.SyncChanges;

// TODO next feature implementation is onmount 