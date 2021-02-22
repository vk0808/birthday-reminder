import React from 'react';

const List = ({ people, setPeople }) => {
  const removeItem = (id) => {
    setPeople(people.filter((person)=>person.id !== id));
  }
  return (
    <>
      {people.map((person)=>{
        const {id, name, age, image} = person;
        return (
          <article key={id} className="person">
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} years</p>
              <button className="btn" onClick={()=>removeItem(id)}>remove</button>
            </div>
          </article>
        )
      })}
    </>
  );
}

export default List;