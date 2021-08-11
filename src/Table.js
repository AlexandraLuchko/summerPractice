import React, { useEffect, useState } from 'react';
import './table.css';
import Pagination from './Pagination';
import Popup from './Popup';
import EditPopup from './EditPopup';
import { getUsers as getUsersAction, deleteUser as deleteUserAction } from './modules/users'
import { connect, useDispatch } from 'react-redux';

function Table({users, getUsers, deleteUser}) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  useEffect(() => {
    dispatch(getUsers())
  }, []);
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [searchValue, setSearchValue] = useState('');
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
    // setUsers([...users]);
  }

  // const deleteUser = (id) => {
  //   let noDeletedUser;
  //     if(window.confirm("Are you sure?"))
  //     {
  //       noDeletedUser = users.filter(function(user){
  //         return user.id !== id;
  //       });
  //        setUsers([...noDeletedUser]);
  //     }
  // }

  const editUser = (id, name, username, email, street, suite, city, zipcode, lat, lng, phone, website,  companyName, companyCatchPhrase, companyBs) => {
      let address = {};
      let company = {};
      address.geo = {};
      const editedUser = {id, name, username, email, address, phone, website, company}
      editedUser.id = id;
      editedUser.name = name;
      editedUser.username = username;
      editedUser.email = email;
      editedUser.address.street = street;
      editedUser.address.suite = suite;
      editedUser.address.city = city;
      editedUser.address.zipcode = zipcode;
      editedUser.address.geo.lat = lat;
      editedUser.address.geo.lng = lng;
      editedUser.phone = phone;
      editedUser.website = website;
      editedUser.company.name = companyName;
      editedUser.company.catchPhrase = companyCatchPhrase;
      editedUser.company.bs = companyBs;
      const leftUsers = users.filter(function(user){
        console.log(user.id)
        return user.id !== Number(id);   
      });     
      leftUsers.push(editedUser);
      console.log(id);
      // setUsers([...leftUsers]);
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
          <tr className="table-row">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address.street + ' ' +user.address.suite + ' ' + user.address.city + ' ' + user.address.zipcode + ' ' + user.address.geo.lat + ' ' + user.address.geo.lng}</td>  
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company.name + ' ' + user.company.catchPhrase + ' ' + user.company.bs}</td> 
            <td><EditPopup editUser={editUser} user={user}/></td>  
            <td><button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button></td>            
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

export default connect(
  ({ users }) => ({ users: users.users }),
  {
    getUsers: getUsersAction,
    deleteUser: deleteUserAction,
  }
)(Table);
