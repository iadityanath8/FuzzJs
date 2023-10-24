import Fuzz from "../index.js";
import { $see, $monitor, record, onMount } from '../reactivity.js'


let fake_db = [
    {
        id: 1,
        name: "Aditya"
    },
    {
        id: 2,
        name: "Aman"
    },
    {
        id: 3,
        name: "Adeet"
    },
    {
        id: 4,
        name: "Laksh"
    },
    {
        id: 5,
        name: "Lakahn"
    },
    {
        id: 6,
        name: "Pravesh"
    },
    {
        id: 7,
        name: "Paras"
    },
    {
        id: 8,
        name: "Pradeep"
    },
    {
        id: 9,
        name: "Ember"
    },
    {
        id: 10,
        name: "Johnny"
    },

]

// {...range(0,len).map((e) => record(() => <p data-render={"a" + e}>{
//     real_fake()[e] === undefined?"":real_fake()[e].name    
// }</p>))}

const For = (props) => {
    console.log("Hello world", props.key);
}

export const Navbar = () => {
    let [result, setresult] = $see("");

    // react way not an optimized ideabut does the job
    let [real_fake, real_fakeset] = $see(fake_db);
    let len = real_fake().length;

    onMount(() => {
        let r = document.querySelector('.navContainer')
        console.log(r)
    }).then((res) => res())
    
    
    return (
        <div class="navContainer">
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <form class="d-flex">
                        <input class="form-control me-2" id="a_val" type=" search" placeholder="Search" aria-label="Search"
                            oninput={() => {
                                const val = (document.getElementById('a_val') as HTMLInputElement).value;
                                real_fakeset(fake_db.filter((e) => e.name.startsWith(val)))
                            }}
                        />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <div class="SearchResultFilter" style={{ margin_top: "2em" }}>
                {/* {record(() => <div class="ll list-group" data-render="a">
                    {...real_fake().map((e) => <p class={e.id}> {e.name}</p>) as Array<Object>}
                </div>)} */}
                
                {...Fuzz.range(0, len).map((e) => record(() => <p class="a" data-render={e.toString() + "a"}>{real_fake()[e] === undefined ? "" : real_fake()[e].name}</p>))}
                
            </div>
        </div>
    )
}

export default Navbar;

{/* <For key='2'>
                        {(i, j) => {
                            <p>Hekko</p>
                        }}
                    </For> */}