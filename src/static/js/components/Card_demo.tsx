import Fuzz from "../index.js";
import { $see, $monitor, record, Fuzz_renderer } from '../reactivity.js'

function range(startAt = 0, size) {
    return Array.from(new Array(size), (x, i) => i);
}

let db = [
    {
        id: "1",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! ek alien device ka ",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added",
    },
    {
        id: "2",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! despatiso despatoso  ",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    },
    {
        id: "3",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! KIllu mwoe moew ",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    },
    {
        id: "4",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! Meow",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    },
    {
        id: "5",
        name: "Billu",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sapiente doloremque maiores quaerat perferendis voluptates dolores assumenda consequatur eaque laboriosam. Doloribus asperiores iure eos aliquid molestias nobis minima corrupti amet! Meow",
        img: "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
        added: "not added"
    }
]

function setlogic(db, e, setter) {

}

export const Card = () => {

    let [getdb, setdb] = $see(db);

    const updatestate = (id_state) => {
        const newState = getdb().map(obj => {
            // 👇️ if id equals 2, update country property
            if (obj.added === "not added" && obj.id === id_state) {
                return { ...obj, added: "added" };
            }else if(obj.added === "added" && obj.id === id_state){
                return { ...obj, added: "not added" };
            }

            // 👇️ otherwise return the object as is
            return obj;
        });

        setdb(newState);
    }

    // console.log(getdb())
    // setdb([...getdb()])
    return (

        <div class="container" style={{ display: "flex", flex_direction: "row", gap: "2em", flex_wrap: "wrap" }}>
            {
                ...range(0, 4).map((e) => <div class="card" style="width: 18rem;">
                    <img src={getdb()[e].img} class="card-img-top" alt="..." />
                    <div class="card-body" >
                        <h5 class="card-title">{getdb()[e].title}</h5>
                        <p class="card-text">{getdb()[e].desc}</p>
                        
                        {/* <a onclick = {() => e.added === "not added"?setdb([...getdb(), {added:"added"}]):setdb([...getdb(), {added:"not added"}])} class="btn btn-primary">go somewhere</a> */}

                        {record(() => <p  data-render = {e.toString() + "a"}>{getdb()[e].added}</p>)}

                        <a class="btn btn-primary" onclick = {() => updatestate(getdb()[e].id)}>ho here</a>
                    
                    </div>
                </div>)
            }
        </div>
    )
}


export default Card;