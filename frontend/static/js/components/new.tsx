import rdom from '../index.js';
import { $monitor, record } from '../reactivity.js'



export const navbar = (refc) => {
    return (
        <div class="This">
            <ul class="one_class">
                <li>
                    {record(() => <a href="/" class = "miui">Home {refc().toString()}</a>)}
                </li>
                <li><a href="/about">about page</a></li>
                <li><a href="/feedback">feedback page is loading</a></li>
            </ul>
        </div>
    )
}

export default navbar;