// just imported from the following thing in here

// import sheet from './index.css' assert { type: 'css' };

let context = []
let chek_render = false;

function $see(T) {
  let f__vak = T;
  let subscription = new Set() // to avoid the duplicates thats why we are using the Set
  let passer = undefined;

  const read = () => {
    if (context[context.length - 1] !== undefined) {
      subscription.add(context[context.length - 1])
    }
    return f__vak;
  }


  const write = (T) => {
    if (typeof T == 'function') {
      f__vak = T(f__vak);
    } else {
      f__vak = T;
    }

    subscription.forEach((fn) => fn())
  }

  return [read, write];
}


function $monitor(Call$Back) {
  try {
    chek_render = true;
    context.push(Call$Back);
    let i = Call$Back()
    context.pop()
    return i;
  } catch {
    new Error("Cannot call the function")
  }
}


function $set$props(element, props) {
  for (let i in props) {
    element.setAttribute(i, props[i])
  }
}

function MakeElement(tag_name, props, ...childrens) {
  let element = document.createElement(tag_name);


  $set$props(element, props);

  if (childrens[0] !== undefined) {
    for (let i of childrens) {
      if (typeof i === 'string') {
        element.appendChild(document.createTextNode(i))
      } else {
        element.appendChild(i)
      }
    }
  }

  element.on$click = (fn) => {
    element.onclick = fn
    return element
  }

  // Experimental Api
  element.attr = (text, fn) => {
    t = (text.split("on")[1]).toString()
    element.addEventListener(t, fn);
  }

  return element;
}

function html(...childrens) {
  return MakeElement('html', ...childrens)
}
function head(...childrens) {
  return MakeElement('head', ...childrens)
}
function br(...childrens) {
  return MakeElement('br', ...childrens)
}
function div(...childrens) {
  return MakeElement('div', ...childrens)
}
function nav(...childrens) {
  return MakeElement('nav', ...childrens)
}
function a(...childrens) {
  return MakeElement('a', ...childrens)
} function img(...childrens) {
  return MakeElement('img', ...childrens)
} function video(...childrens) {
  return MakeElement('video', ...childrens)
} function hr(...childrens) {
  return MakeElement('hr', ...childrens)
} function h1(...childrens) {
  return MakeElement('h1', ...childrens)
} function h2(...childrens) {
  return MakeElement('h2', ...childrens)
} function h3(...childrens) {
  return MakeElement('h3', ...childrens)
} function h4(...childrens) {
  return MakeElement('h4', ...childrens)
} function h5(...childrens) {
  return MakeElement('h5', ...childrens)
} function h6(...childrens) {
  return MakeElement('h6', ...childrens)
}

function check_undef(clz) {
  if (clz === undefined) {
    return ''
  }
}


function re_render(clazz, text) {
  if (typeof text == 'function') {
    document.querySelector(clazz).innerText = text()
    return;
  }
  document.querySelector(clazz).innerText = text;
}

function* loop(times, fn) {
  if (typeof times == 'object') {
    yield json_data.map(fn)
  } else if (typeof times == 'number') {
    for (let i = 0; i < times; i++) {
      yield fn()
    }
  }
}


function Router(routes) {
  // let result = div();

  result.SyncChanges = () => {
    while (this.firstChild) {
      this.removeChild(this.lastChild)
    }
  }

  return result;
}

function Hrouter(routes) {

  let result = div({ class: "__router_mclass" })

  result.SyncChanges = () => {
    let hash = (window.location.hash).split("#")[1];
    console.log(hash)
    if (hash === undefined || hash == "/") {
      // result.innerText = ''

      while (result.firstChild) {
        result.removeChild(result.lastChild)
      }

      result.appendChild(routes["/"]())

    }
    else if (hash in routes) {
      // result.innerText = ' ';
      while (result.firstChild) {
        result.removeChild(result.lastChild)
      }
      result.appendChild(routes["/"]())
      result.appendChild(routes[hash]())
    }
  }

  return result;
}

// navbar component
export const Home = () => {
  return nav({ class: "nav" },
    a({ href: "#/" }, "Home"),
    a({ href: "#/about" }, "about"),
    a({ href: "#/feedback" }, "feedback")
  )
}

export const about = () => {
  return div({ class: "m_about" },
    "I am about page"
  )
}


export const loppo = () => {
  return div({ class: "Thisclass" }, "loop is in here")
}

export const feedback = () => {
  return div(
    {},
    ...loop(3, loppo)
  )
}

export const mainapp = Hrouter(
  {
    "/": Home,
    "/about": about,
    "/feedback": feedback
  }
)

// document.adoptedStyleSheets = [sheet];