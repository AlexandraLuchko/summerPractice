import React, { useState } from 'react';
import axios from 'axios'
import './table.css';

function Table() {

  const [users, setUsers] = useState([])

  const api = axios.create({
    baseURL: `http://localhost:3000/users/`
  })

  api.get('/').then(res => {
    setUsers(res.data)
  })

  return (
    <table>
        {users.map(user => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address.street + ' ' +user.address.suite + ' ' + user.address.city + ' ' + user.address.zipcode + ' ' + user.address.geo.lat + ' ' + user.address.geo.lng}</td>  
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company.name + ' ' + user.company.catchPhrase + ' ' + user.company.bs}</td>               
          </tr>
        ))}
    </table>
  );
}

export default Table;
