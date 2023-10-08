import {Hello} from './meow.js';
//import {rdom} from './index.js';

//function Hello(){
//    let a = rdom.MakeElement('button',null, "+")//.attr('onclick', () => console.log("Bhow"))
//    return a;
//}

// mainapp.SyncChanges()
document.getElementById("main").appendChild(Hello());
// window.onhashchange = mainapp.SyncChanges;