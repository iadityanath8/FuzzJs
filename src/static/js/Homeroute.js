import Home from "./components/Home.js";
import Navbar from "./components/nav.js";
import { Hrouter } from './reactivity.js';
import Counter from "./components/Counter.js";
export var Homeroute = Hrouter({
    "/": Home,
    "/nav": Navbar,
    "/Counter": Counter,
    // "/Shop":Card
});
export default Homeroute;
