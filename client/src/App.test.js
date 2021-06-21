
import App from './App';
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Link, MemoryRouter } from 'react-router-dom';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


import Home from "./components/Home/Home.jsx"
import Card from "./components/Card/Card.jsx"
import SearchBar from './components/SearchBar/SearchBar';
import Pais from './components/DetallePais/DetallePais';
import LandingPage from './components/LandingPage/LandingPage';
import AddActivity from './components/AddActivity/AddActivity';


configure({ adapter: new Adapter() });

describe("App", () => {

  let store;
  const middlewares = [thunk];
  const mockSotre = configureStore(middlewares)
  const state = {
    countries: [
      {
        id: "ARG",
        name: "Argentina",
        image: "http://arg.jpg",
        continent: "Americas",
      },
      {
        id: "BRA",
        name: "Brazil",
        image: "http://bra.jpg",
        continent: "Americas",
      },

    ],
    CountryDetail: {
      id: "BRA",
      name: "Brazil",
      image: "http://bra.jpg",
      continent: "Americas",
    }
  }

  beforeEach(() => {
    store = mockSotre(state)
  })

  describe("App", () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<App />)
    })
    it('Deberia renderizar 1 componente <SearchBar />', () => {
      expect(wrapper.find(SearchBar)).toHaveLength(1)
    })
    it('Deberia tener 2 <Link />', () => {
      expect(wrapper.find(Link)).toHaveLength(2)
    })
    it('El componente Home debe renderizar en la ruta /home' , () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/home' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
  
        expect(wrapper.find(Home)).toHaveLength(1);
      
    });
  
   it('El componente CountryDetail debe renderizar en la ruta /home/:id', () => {
      wrapper= mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home/:id"]}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Pais)).toHaveLength(1)
    })
   it('El componente LandingPage debe renderizar en la ruta /', () => {
      wrapper= mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(LandingPage)).toHaveLength(1)
    })
   it('El componente AddActivity debe renderizar en la ruta /act', () => {
      wrapper= mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/act"]}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(AddActivity)).toHaveLength(1)
    })
  })
 

   
 
 
})
