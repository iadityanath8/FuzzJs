import re

def transpile_jsx(jsx_code):
    js_code = jsx_code
    # Replace JSX-like tags with createElement function calls
    js_code = re.sub(r'<(\w+)(.*?)>(.*?)</\1>', r'createElement("\1", \2, [\3])', js_code, flags=re.DOTALL)
    # Replace self-closing tags with createElement function calls
    js_code = re.sub(r'<(\w+)(.*?) />', r'createElement("\1", \2, [])', js_code)
    # Replace attributes
    js_code = re.sub(r'(\w+)="(.*?)"', r'"\1": "\2"', js_code)
    # Replace JSX expressions
    js_code = re.sub(r'{(.*?)}', r'\1', js_code)
    
    js_code = f'''
function createElement(tag, props, children) {{
    const element = document.createElement(tag);
    for (const prop in props) {{
        element.setAttribute(prop, props[prop]);
    }}
    children.forEach(child => {{
        if (typeof child === 'string') {{
            element.appendChild(document.createTextNode(child));
        }} else {{
            element.appendChild(child);
        }}
    }});
    return element;
}}

const root = document.getElementById('root');
{js_code}

root.appendChild(jsx);
'''
    
    return js_code

jsx_code = '''
<div className="my-div">
    Hello, <span>world</span>!
</div>
'''

js_code = transpile_jsx(jsx_code)
print(js_code)
