import Fuzz from "../index.js";
import { $see, $monitor } from '../reactivity.js'

let ss = {
    fcs: {
        display: "flex",
        justify_content: "center",
        align_items: "center",
        height: "100vh"
    },
    thisc: {

        color: "violet"
    },

    ffc: {
        width: "331px",
        height: "361px"
    }
}


Fuzz.Loadassest("/static/js/components/test.css")
export const Home = () => {
    return (
        <div>
            <div style={ss.fcs}>
                <p class="This">
                    <img src="/static/js/components/jebaited.jpg" alt="" style={ss.ffc}/>
                    Hello world from my home in here
                </p>
            </div>
        </div>
    )
}

export default Home;