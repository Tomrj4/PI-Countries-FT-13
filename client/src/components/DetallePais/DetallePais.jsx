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
                    {Country ?
                        <>
                            <img className={styles.img} src={Country.image} alt="Country" />

                            <div className={styles.textContainer}>

                                <p>Name: {Country.name}</p>
                                <p>Continent: {Country.continent}</p>
                                <p>Capital: {Country.capital}</p>
                                <p>Population: {Country.population}</p>
                                <p>Area: {Country.area}km²</p>
                                <p>Subregion: {Country.subregion}</p>



                            </div>
                        </>
                        : null
                    }
                </div>
            </div>
            {
                Country && Country.activities && Country.activities.length > 0 ?
                    <h3> Activities </h3> : null
            }

            <div className={styles.containerActivities}>
                {

                    Country && Country.activities ? Country.activities.map((c) => {
                        return (
                            <div className={styles.activities}>
                                <p> Name: {c.name} </p>
                                <p> Difficulty: {c.difficulty} </p>
                                <p> Duration: {c.duration} </p>
                                <p> Season: {c.season} </p>
                            </div>
                        )
                    }) : <br></br>


                }
            </div>

        </div>
    )
}
export default Pais