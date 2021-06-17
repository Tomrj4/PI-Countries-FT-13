import { Link } from "react-router-dom"
import styles from "./LandingPage.module.css"
function LandingPage() {
    return (
        <div className={styles.landingContainer}>
        <div className={styles.landing}>
            <h1 className={styles.Title}> Welcome to WikiCountries!  </h1>
           <Link className={styles.link} to='/home'><button className={styles.button}>  Click here to entry!   </button></Link>
        </div>
        </div>
    )
}


export default LandingPage