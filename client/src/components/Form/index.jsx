import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getCountries } from "../../actions";
import styles from "./Form.module.css";
import Select from 'react-select'
const axios = require("axios").default;

function Form() {
  const [formValue, setFormValue] = useState({
    name: "",
    duration: "",
    difficulty: "",
    season: "",
  });

  const [selectedCountries, setSelectedCountries] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActivities());
    dispatch(getCountries());
  }, [dispatch]);

  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const handleChange = (event) => {
      setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleChangeCountries = (value) => {
    setSelectedCountries(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formValue.name === "" ||
      formValue.duration === "---" ||
      formValue.difficulty === "---" ||
      formValue.season === "---" ||
      selectedCountries.length === 0
    ) {
      return alert("You must complete all the fields");
    } else if (activities.find((el) => el.name === formValue.name)) {
      return alert("An activity with that name already exists");
    } else {
      await axios.post("/activity", {
        Countries: selectedCountries,
        name: formValue.name,
        difficulty: formValue.difficulty,
        duration: formValue.duration,
        season: formValue.season,
      });
    }
  };
  const options = countries.map(c => ({ label: c.name, value: c.id })); 
  return (
    <div className={styles.conteinerForm}>
      <div className={styles.cardForm}>
        <div className={styles.title}>
          <h2 > Add a new Activity here! </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.InputConteiner}>
            <div className={styles.selectorContainer}>
              <label> Country: </label>
              <Select
              className={styles.selector}
                options={options}
                isMulti
                isSearchable
                onChange={handleChangeCountries}
              />
              {/* <select
                className={styles.selector}
                multiple={true}
                name="countries"
                value={selectedCountries}
                onChange={handleChange}
              >
                {countries.map((c) => (
                  <option>{c.name}</option>
                ))}
              </select> */}
            </div>
            <br></br>
            <div className={styles.DivMain}>
              <div className={styles.div1}>
                <label className={styles.label}> Name: </label>
                <input
                  className={styles.Input}
                  type="text"
                  name="name"
                  value={formValue.name}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <div>
                <label className={styles.label}> Duration: </label>
                <select
                  className={styles.Input}
                  name="duration"
                  onChange={handleChange}
                >
                  <option>---</option>
                  <option>1Hs</option>
                  <option>2Hs</option>
                  <option>3Hs</option>
                  <option>4Hs</option>
                  <option>5Hs</option>
                  <option>6Hs</option>
                </select>
              </div>
              <br></br>
              <div>
                <label className={styles.label}> Difficulty: </label>
                <select
                  className={styles.Input}
                  type="number"
                  name="difficulty"
                  onChange={handleChange}
                >
                  <option>---</option>
                  <option>1-very easy</option>
                  <option>2-easy</option>
                  <option>3-meddium</option>
                  <option>4-hard</option>
                  <option>5-very hard</option>
                </select>
              </div>
              <br></br>
              <div>
                <label className={styles.label}> Season: </label>
                <select
                  className={styles.Input}
                  type="text"
                  name="season"
                  onChange={handleChange}
                >
                  <option>---</option>
                  <option> Summer </option>
                  <option> Fall </option>
                  <option> Winter </option>
                  <option> Spring </option>
                </select>
              </div>
              <br></br>
              <button className={styles.submitButtom} type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
<br></br>;
