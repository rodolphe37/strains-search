import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'


// https://jsonplaceholder.typicode.com/photos


function App() {
  const [state, setState] = useState({ users: [], isLoading: true, errors: null})
  // const [isLoading, setIsLoading] = useState(true)
  // const [errors, setErrors] = useState(null)



  useEffect(() => {
    axios
    .get("https://randomuser.me/api/?results=20")
    .then(response =>
      response.data.results.map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        image: `${user.picture.thumbnail}`
      }))
    )
    .then(users => {
      setState({
        users,
        isLoading: false
      });
    })
    .catch(error => setState({ error, isLoading: false }));
  },[])

  const { isLoading, users } = state;
  return (
    <React.Fragment>
    <h2>Random User</h2>
    <div>
      {!isLoading ? (
        users.map(user => {
          const { username, name, email, image } = user;
          return (
            <div key={username}>
              <p>{name}</p>
              <div>
                <img src={image} alt={name} />
              </div>
              <p>{email}</p>
              <hr />
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </React.Fragment>
  );
}

export default App;
