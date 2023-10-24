import Fuzz from "../index.js";
import { $see, $monitor } from '../reactivity.js'

const stylesheet = {
    sep: {
        margin_bottom: "2em"
    },
}

export const Home = () => {
    return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light" style={stylesheet.sep}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">

                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#/">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" href="#/Counter">Counter</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#/nav">Go to search</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#/Shop">Shop</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            // <p>Down in here</p>
     )
}

export default Home;