import { Hello } from './meow.js';
import { Fuzz_renderer, $monitor } from './reactivity.js';


// Hello.SyncChanges()
Fuzz_renderer.Render_DOm(Hello(), document.getElementById("main"))
// window.onhashchange = Hello.SyncChanges;
// TODO next feature implementation is onmount 