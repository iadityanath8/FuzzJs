import { Hello } from './meow.js';
import { Rdom_renderer, $monitor } from './reactivity.js';
// import {home} from './rdom.js';


// Hello.SyncChanges()
Rdom_renderer.Render_DOm(Hello(), document.getElementById("main"))
// window.onhashchange = Hello.SyncChanges;

// TODO next feature implementation is onmount 