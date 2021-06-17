import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCountries } from "../../actions"
import styles from "./Form.module.css"
const axios = require("axios").default


function Form() {
    const [formValue, setFormValue] = useState({
        name: "",
        duration: "",
        difficulty: "",
        season: ""
    })

    const [selectedCountries, setSelectedCountries] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const countries = useSelector(state => state.countries)



    const handleChange = (event) => {
        if (event.target.name === "countries") {
            setSelectedCountries([...selectedCountries, event.target.value])
        } else
            setFormValue({ ...formValue, [event.target.name]: event.target.value })
        console.log(selectedCountries)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formValue.name === "" || formValue.duration === "" || formValue.difficulty === "" || formValue.season === "") {
            return alert("You must complete all the fields")
        } else {

            await axios.post('http://localhost:3001/activity', {
                Countries: selectedCountries,
                name: formValue.name,
                difficulty: formValue.difficulty,
                duration: formValue.duration,
                season: formValue.season
            })
        }

    }
    return (
        <div className={styles.conteinerForm}>
            <div className={styles.cardForm}>

                <h2 className={styles.title}> Add a new Activity here!  </h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.InputConteiner}>
                        <div className={styles.selectorContainer}>

                            <label> Pais: </label>
                            <select className={styles.selector} multiple={true} name="countries" value={selectedCountries} onChange={handleChange}>
                                {
                                    countries.map((c) => (
                                        <option>{c.name}</option>
                                    ))
                                }
                            </select>
                        </div><br></br>
                        <div className={styles.DivMain}>

                            <div className={styles.div1}>
                                <label className={styles.label}> Nombre: </label>
                                <input className={styles.Input} type="text" name="name" value={formValue.name} onChange={handleChange} />
                            </div><br></br>
                            <div>
                               <label className={styles.label}> Duracion: </label>
                                <input className={styles.Input} type="number" name="duration" value={formValue.duration} onChange={handleChange} />
                            </div><br></br>
                            <div>
                               <label className={styles.label}> Dificultad: </label>
                                <input className={styles.Input} type="number" name="difficulty" value={formValue.difficulty} onChange={handleChange} />
                            </div><br></br>
                            <div>
                               <label className={styles.label}> Temproada: </label>
                                <input className={styles.Input} type="text" name="season" value={formValue.season} onChange={handleChange} /><br></br>
                            </div><br></br>
                            <button className={styles.submitButtom} type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Form; <br></br>