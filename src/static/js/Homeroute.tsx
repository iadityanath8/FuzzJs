import Home from "./components/Home.js";
import Navbar from "./components/nav.js";
import Fuzz from "./index.js";
import {Hrouter} from './reactivity.js'
import Counter from "./components/Counter.js";
import Card from "./components/Card_demo.js";

export const Homeroute = Hrouter({
    "/":Home,
    "/nav":Navbar,
    "/Counter":Counter,
    "/Shop":Card
});

export default Homeroute;