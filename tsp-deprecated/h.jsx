let element = (

    JSX!{ 
        <div class="Meow" id="THos" >
            <p>This is my p tag in here</p>
            Hello world from my home in here
        </div>
    }

)


// expansion

const el = () => {
    return MakeElement("div",
        { class: "Meow", id:"Thos" },
        MakeElement("p", ),
        MakeElement("p",{}, "Hello world from my home in here"))
}