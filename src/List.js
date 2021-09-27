import React from "react";
import moment from "moment";
import Birthday from "./Birthday";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ people, removePerson, editPerson, today, setAmount }) => {
  let filteredData = people.filter((person) => {
    const presentDate = new Date();

    return (
      presentDate.getDate() === parseInt(moment(person.date).format("D")) &&
      presentDate.getMonth() === parseInt(moment(person.date).format("M")) - 1
    );
  });
  setAmount(filteredData.length);
  const birthday = today === true ? filteredData : people;
  return (
    <>
      {today === true && birthday.length === 0 ? (
        <div className="no-birthday-today">No birthdays today</div>
      ) : (
        birthday.map((person) => {
          const { id, name, age, date, image } = person;
          return (
            <article key={id} className="person">
              <img
                src={image}
                alt={name}
                onError={(e) =>
                  (e.target.src = `https://avatars.dicebear.com/api/initials/${name}.svg`)
                }
              />
              <div className="pesron-info">
                <h4>{name}</h4>
                <p>{moment(date).format("MMM Do YYYY")}</p>
                <p>{age}</p>
                <Birthday
                  name={name}
                  age={age}
                  day={moment(date).format("D")}
                  month={moment(date).format("M")}
                />
              </div>
              <div className="btns" aria-label="Edit">
                <button className="btn" onClick={() => editPerson(id)}>
                  <a href="#edit">
                    <FaEdit size="20" />
                  </a>
                </button>
                <button className="btn" aria-label="Delete">
                  <FaTrash size="20" onClick={() => removePerson(id)} />
                </button>
              </div>
            </article>
          );
        })
      )}
    </>
  );
};

export default List;
