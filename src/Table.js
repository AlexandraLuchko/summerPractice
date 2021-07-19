import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css';
import Pagination from './Pagination';

function Table() {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  useEffect(() => {
    const api = axios.create({
      baseURL: `http://localhost:3000/users/`
    })

    api.get('/').then(res => {
      setUsers(res.data)
    })
  }, [...users]);
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [searchValue, setSearchValue] = useState('');

  const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>  
      <div className="form">
        <form className="search_form">
          <input 
            type="text"
            placeholder="Search..."
            className="search_input"
            onChange={(event) => setSearchValue(event.target.value)}>
          </input>
        </form>

    </div>
    <table>
    <tbody>
    {currentUsers.map(user => (
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
    </tbody> 
    </table>
    <Pagination 
    usersPerPage={usersPerPage} 
    totalUsers={filteredUsers.length} 
    paginate={paginate}
    />
    </div>
  );
}

export default Table;
