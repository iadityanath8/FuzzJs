import Fuzz from "../index.js";
import { $see, $monitor } from '../reactivity.js'


// DEP NEXT WORK LATER
async function loadassest() {
    const response = await fetch('/static/js/css/main.css');
    const images = await response.text();
}

export const Home = () => {
    return (
        <div style={{ display: "flex", justify_content: "center", align_items: "center", height: "100vh" }}>
            <p class="This">
                Hello world from my home in here
            </p>
        </div>
    )
}

export default Home;