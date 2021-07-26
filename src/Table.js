import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css';
import Pagination from './Pagination';
import Popup from './Popup';

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
  }, []);
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [searchValue, setSearchValue] = useState('');
  console.log(users);

  const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const addUser = (id, name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, companyCatchPhrase, companyBs) => {
    let address = {};
    let company = {};
    address.geo = {};
    const newUser = {id, name, username, email, address, phone, website, company};
    newUser.address.street = street;
    newUser.address.suite = suite;
    newUser.address.city = city;
    newUser.address.zipcode = zipcode;
    newUser.address.geo.lat = lat;
    newUser.address.geo.lng = lng;
    newUser.company.name = companyName;
    newUser.company.catchPhrase = companyCatchPhrase;
    newUser.company.bs = companyBs;
    users.push(newUser);
    setUsers([...users]);
  }

  const deleteUser = (id) => {
    let noDeletedUser;
      if(window.confirm("Are you sure?"))
      {
        noDeletedUser = users.filter(function(user){
          return user.id !== id;
        });
        setUsers([...noDeletedUser]);
      }
  }

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
            <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>            
          </tr>
        ))}
    </tbody> 
    </table>
    <Pagination 
    usersPerPage={usersPerPage} 
    totalUsers={filteredUsers.length} 
    paginate={paginate}
    />
    <div>
      <Popup addUser={addUser}/>
    </div>
    </div>
  );
}

export default Table;
