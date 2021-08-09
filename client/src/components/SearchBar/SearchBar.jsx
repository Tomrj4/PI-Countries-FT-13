import { useState } from "react";
import { useDispatch } from "react-redux";
import {  getByName } from "../../actions";
import styles from "./SearchBar.module.css"
import { BsSearch } from "react-icons/bs"

function SearchBar() {

   let [input, setInput] = useState("")

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setInput(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getByName(input))
      
    }

    return (
        <div className={styles.SearchBar}>

            <form onSubmit={handleSubmit}>
            <div style={{display:"flex"}}>
                <input placeholder="Search..." className={styles.input} type="text" value={input} onChange={handleChange}>

                </input>
                
                <button className={styles.buttom} type="submit" value="Search" > <BsSearch  /> </button>
                
            </div>
            </form>
        </div>
    )
}

export default SearchBar;