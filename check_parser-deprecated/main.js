function compileJSX(jsxCode) {
    const code = jsxCode
        .replace(/<(\w+)/g, 'createElement("$1",')
        .replace(/<\/(\w+)>/g, ')')
        .replace(/(\w+)="(.*?)"/g, ` {{$1:"$2"}} `)
        .replace(/{(.*?)}/g, ',$1,')
        .replace(/>/g, ')')
        .replace(/</g, 'createElement(');

    return `
      function createElement(tag, props, ...children) {
        return {
          tag,
          props,
          children,
        };
      }
      
      function render(element, container) {
        if (typeof element === 'string') {
          const textNode = document.createTextNode(element);
          container.appendChild(textNode);
          return;
        }
      
        const { tag, props, children } = element;
        const elementNode = document.createElement(tag);
      
        for (const prop in props) {
          elementNode.setAttribute(prop, props[prop]);
        }
      
        children.forEach((child) => {
          render(child, elementNode);
        });
      
        container.appendChild(elementNode);
      }
      
      const root = document.getElementById('root');
      const jsx = ${code};
      render(jsx, root);
    `;
}

let a = 90;
const jsxCode = `
    <div class="my-div">
      Hello ,
        <span>
            Hello
        </span>
    </div>
  `;

const compiledCode = compileJSX(jsxCode);

console.log(compiledCode);
