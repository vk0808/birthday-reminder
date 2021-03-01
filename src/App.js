import "./styles.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment-precise-range-plugin";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let people = localStorage.getItem("people");
  if (people) {
    return JSON.parse(localStorage.getItem("people"));
  } else {
    return [];
  }
};

export default function App() {
  const [info, setInfo] = useState({
    image: "",
    name: "",
    age: "",
    date: null
  });
  const [people, setPeople] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.date) {
      info.age = calculate_age(info.date);
    }
    if (!info.name || !info.image || !info.age) {
      showAlert(true, "danger", "please enter value");
    } else if (info.name && info.image && info.date && isEditing) {
      setPeople(
        people.map((person) => {
          if (person.id === editId) {
            return {
              ...person,
              name: info.name,
              image: info.image,
              date: info.date,
              age: calculate_age(info.date)
            };
          }
          return person;
        })
      );
      setInfo({ image: "", name: "", age: "", date: null });
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "details changed");
    } else {
      showAlert(true, "success", "person added to list");
      const newItem = {
        id: new Date().getTime().toString(),
        image: info.image,
        name: info.name,
        age: info.age,
        date: info.date
      };
      setPeople([...people, newItem]);
      e.target.reset();
      setInfo({ image: "", name: "", age: "", date: null });
    }
  };

  const calculate_age = (dob) => {
    var m1 = moment(new Date(dob), "DD-MM-YYYY HH:mm:ss");
    var m2 = moment(new Date(), "DD-MM-YYYY HH:mm:ss");
    // var diff = moment.preciseDiff(m1, m2);
    var diff = moment.duration(m1.diff(m2)).humanize();
    return diff;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo({ ...info, [name]: value });
  };

  const removePerson = (id) => {
    showAlert(true, "danger", "person removed");
    setPeople(people.filter((person) => person.id !== id));
  };

  const clearList = () => {
    showAlert(true, "danger", "everything cleared");
    setPeople([]);
  };

  const editPerson = (id) => {
    const specificPerson = people.find((person) => person.id === id);
    setIsEditing(true);
    setEditId(id);
    setInfo({
      image: specificPerson.image,
      name: specificPerson.name,
      date: specificPerson.date
    });
  };

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  return (
    <main>
      <section className="container">
        <h3 className="title">birthday remainder</h3>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} people={people} />
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              className="list"
              name="name"
              type="text"
              placeholder="name"
              value={info.name}
              onChange={handleChange}
            />
            <DatePicker
              className="list"
              placeholderText="dob - mm/dd/yyyy"
              selected={info.date ? new Date(info.date) : null}
              onChange={(date) => setInfo({ ...info, date: date })}
              maxDate={new Date()}
              dateFormat="MM/dd/yyyy"
              orientation="bottom"
              isClearable
              showMonthDropdown
              showYearDropdown
              scrollableMonthYearDropdown
            />
            <input
              className="list"
              name="image"
              type="text"
              value={info.image}
              placeholder="image url"
              onChange={handleChange}
            />
            <button className="add-btn" type="submit">
              {isEditing ? "update" : "add"}
            </button>
          </div>
        </form>
        {people.length > 0 && (
          <div>
            <h3>
              {people.length} {people.length > 1 ? "birthdays" : "birthday"} in
              the list
            </h3>
            <List
              people={people}
              removePerson={removePerson}
              editPerson={editPerson}
            />
            <button className="clear-btn" onClick={clearList}>
              clear all
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
