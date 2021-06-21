import { Route } from 'react-router';
import './App.css';
import Pais from './components/DetallePais/DetallePais';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage'
import { Link } from 'react-router-dom';
import AddActivity from './components/AddActivity/AddActivity';
import { AiOutlineHome } from 'react-icons/ai'
import SearchBar from './components/SearchBar/SearchBar.jsx';
function App() {


  return (
    <div className="App">
      <header>
        <div className="NavBar">
          <div className="NavBar1" >
            <h1 className="title">WikiCountries!</h1>
          </div>
          <SearchBar />
          <div className="NavBar2">
            <Link className="link" to='/act'><button className="button"> Create Activity </button></Link>
            <Link className="link" to='/home'> <AiOutlineHome className="buttonHome"></AiOutlineHome></Link>

          </div>
        </div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/:id" exact component={Pais} />
        <Route path="/act" exact component={AddActivity} />
      </header>
    </div>
  );
}

export default App;
