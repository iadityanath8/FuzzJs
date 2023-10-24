import Homeroute from './Homeroute.js'
import { Fuzz_renderer, $monitor } from './reactivity.js';


Homeroute.SyncChanges()
Fuzz_renderer.Render_DOm(Homeroute, document.getElementById("main"))
window.onhashchange = Homeroute.SyncChanges;
// TODO next feature implementation is onmount 