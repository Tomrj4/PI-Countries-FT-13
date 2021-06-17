import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { CountryDetail } from '../../actions/index';
import styles from "./DetallePais.module.css"

function Pais(props) {
    const dispatch = useDispatch()
    const Country = useSelector(state => state.countryDetail)
    useEffect(() => {
        dispatch(CountryDetail(props.match.params.id))
    }, [])

    console.log(Country)
    return (
        <div className={styles.conteiner}>
            <div className={styles.containerDetail}>

                <div className={styles.CardDetail}>
                    <img className={styles.img} src={Country.image} alt="Country"/>

                    <div className={styles.textContainer}>

                        <p>Nombre: {Country.name}</p>
                        <p>Continente: {Country.continent}</p>
                        <p>Capital: {Country.capital}</p>
                        <p>Poblation: {Country.population}</p>
                        <p>Area: {Country.area}km²</p>
                        <p>Subregion: {Country.subregion}</p>



                    </div>

                </div>
            </div>
            <div className={styles.containerActivities}>

                {

                    Country.activities ? Country.activities.map((c) => {
                        return (
                            <div className={styles.activities}>
                                <p> Nombre: {c.name} </p>
                                <p> Dificultad: {c.difficulty} </p>
                                <p> Duracion: {c.duration} </p>
                                <p> Temporada: {c.season} </p>
                            </div>
                        )
                    }) : <br></br>


                }
            </div>

        </div>
    )
}
export default Pais