import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { GrPrevious, GrNext } from "react-icons/gr"
import { getActivities } from '../../actions';

function Card() {
    const countries = useSelector(state => state.countries)
    const activities= useSelector(state => state.activities)
    const [page, setPage] = useState(0);
    const [max, setMax] = useState(0);

    const [Filter, setFilter] = useState([])
    const [Order, setOrder] = useState([])
const dispatch = useDispatch( )
    useEffect(() => {
        dispatch(getActivities())
        setMax(countries.length - 10)
    }, [countries])

    const nextPage = () => { page < max && setPage(page + 10) };
    const prevPage = () => { page > 0 && setPage(page - 10) };


    const AZ = (a, b) => { return (a.name > b.name ? 1 : -1) }
    const ZA = (a, b) => { return (b.name > a.name ? 1 : -1) }

    const Asc = (a, b) => { return b.population - a.population }
    const Desc = (a, b) => { return a.population - b.population }

    const handleOrder = (event) => {
        setOrder(event.target.value)
    }

    let countriesFiltered = Filter.length > 0 ? Filter : countries
    useEffect(() => {
        switch (Order) {
            case 'O': return setFilter(countries)
            case 'AZ': return setFilter([...countriesFiltered].sort(AZ))
            case 'ZA': return setFilter([...countriesFiltered].sort(ZA))
            case 'Asc': return setFilter([...countriesFiltered].sort(Asc))
            case 'Desc': return setFilter([...countriesFiltered].sort(Desc))
            default: return countriesFiltered
        }
    }, [Order])


    
    // console.log(countries)
    let act = []
    for (let i = 0; i < countries.length; i++) {
        const element = countries[i].activities[0];
        act.push({
            activity: element
        })
    }
    let act1 = act.filter((x) => x.activity !== undefined)
    // console.log(act1)
    // // let act2 = act1.filter((el, index) => act1.indexOf(el.nombre) === index)
    // // console.log(act2)
    const handleChangeContinent = (event) => {
        let f = []
        if (event.target.value === 'Americas' || event.target.value === 'Europe' || event.target.value === 'Asia' || event.target.value === 'Africa' || event.target.value === 'Oceania') {
            f = countries.filter((c) => c.continent === event.target.value)
            return setFilter(f)
        } else {
            f = countries.filter(x => x.activities[0] !== undefined && x.activities[0].name === event.target.value)
            return setFilter(f)
            // return setFilter(names.filter(x=> x.actividads[0].nombre === event.target.value) )
        }
    }
    return (

        <div className={styles.cardContainer} >
            <div className={styles.formConteiner}>
                <select onChange={handleOrder}>
                    <option value='O'>ORIGINAL</option>
                    <option value='AZ'>AZ</option>
                    <option value='ZA'>ZA</option>
                    <option value='Asc'>POPULATION ASC</option>
                    <option value='Desc'>POPULATION DSC</option>
                </select>
                <select onChange={handleChangeContinent}>
                    <option value='Americas'> Americas </option>
                    <option value='Europe'> Europe </option>
                    <option value='Africa'> Africa </option>
                    <option value='Asia'> Asia </option>
                    <option value='Oceania'> Oceania </option>
                </select>
                <select onChange={handleChangeContinent}>
                    {
                        activities.map((c) => {
                            return (

                                <option value={c.name}>{c.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={styles.cardButtons}>



                <div className={styles.buttonsUpCont}>

                    <div className={styles.buttonsUp}>
                        <button onClick={prevPage} className={styles.buttonPrev1}> <GrPrevious></GrPrevious> </button>
                        <button onClick={nextPage} className={styles.buttonNext1}><GrNext></GrNext> </button>
                    </div>
                </div>


                <div className={styles.mainCard}>
                    {
                        countriesFiltered.length > 0 ? 
                        
                        countriesFiltered.slice(page, page + 10).map((c) => {
                            return (
                            <>
                                <div className={styles.card} >

                                    <img className={styles.img} src={c.image} alt="" />

                                    <div className={styles.textContainer}>

                                        <p> Nombre: {c.name} </p>
                                        <p> Continente: {c.continent} </p>
                                        <Link className={styles.Link} key={c.id} to={`/home/${c.id}`}>
                                            <h6 className={styles.LinkButtom}> See more.. </h6>
                                        </Link>
                                    </div>

                                </div>


                            </>
                            )
                        }) : <h1>Cargando...</h1>
                    }
                </div>
                <div className={styles.buttonsDown}>
                    <button onClick={prevPage} className={styles.buttonPrev1}> <GrPrevious></GrPrevious> </button>
                    <button onClick={nextPage} className={styles.buttonNext1}><GrNext></GrNext> </button>
                </div>
            </div>
        </div>
    )
}
export default Card;
