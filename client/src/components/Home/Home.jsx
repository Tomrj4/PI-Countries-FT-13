import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCountries } from '../../actions/index';
import styles from './Home.module.css'
import Card from '../Card/Card'


function Home() {

  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries)


  useEffect(() => {
    dispatch(getCountries())
  }, [])


  console.log(countries)

  return (
    <div className="Home">
     
      <div>
        <div class={styles.card}>
          <Card />
        </div>
      </div>

    </div>
  );
}

export default Home;