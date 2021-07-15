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
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>  
    <table>
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
    </table>
    <Pagination 
    usersPerPage={usersPerPage} 
    totalUsers={users.length} 
    paginate={paginate}
    />
    </div>
  );
}

export default Table;
