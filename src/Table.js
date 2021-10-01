import React, { useEffect, useState } from 'react';
import './table.css';
import Pagination from './Pagination';
import Popup from './Popup';
import EditPopup from './EditPopup';
import { getUsers, deleteUser as deleteUserAction } from './modules/users'
import { connect, useDispatch } from 'react-redux';
import DataTable from './DataTable';

function Table({users}) {
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

    <DataTable currentUsers={currentUsers}/>
    
    <Pagination 
    usersPerPage={usersPerPage} 
    totalUsers={filteredUsers.length} 
    paginate={paginate}
    />
    <div>
      <Popup />
    </div>
    </div>
  );
}

export default connect(
  ({ users }) => ({ users: users.users }),
  {
    deleteUser: deleteUserAction,
  }
)(Table);
