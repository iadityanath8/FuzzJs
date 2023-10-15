import rdom from '../index.js'
import { $see, $monitor, record } from '../reactivity.js'
export const Home = (key) => {

    let [text, settext] = $see("empty");


    return (
        <div class="Iii_a">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="n ame@example.com" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>

                <textarea class="bx61 form-control" id={"t" + key.toString()} rows="3"  oninput = {(e) => settext(e.target.value)}></textarea>

            </div>

            {/* text area in here */}
            <div class="form-floating">

                {record(() => <textarea class="eeyc form-control" placeholder="Leave a comment here" id={"y" + key.toString()} style="height: 100px">{text()}</textarea>)}
                {record(() => <label id={ "as" + key.toString()} for="floatingTextarea2">{text()}</label>)}
            </div>

        </div>
    )
}

export default Home;