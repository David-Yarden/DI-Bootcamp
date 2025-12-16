import React, { useEffect } from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './usersSlice';
import { adduser } from './usersSlice';


export default function Users() {
  const users = useSelector((state) => state.userReducer.users);
  const status = useSelector((state) => state.userReducer.status);
  const error = useSelector((state) => state.userReducer.error);
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

  if(state.status === 'loading') return <h2>Loading...</h2>;
  if(state.status === 'failed') return <h2>{state.error}</h2>;


  return (    
   
  <div>
    <div>
        <input ref={nameRef}/>
        <button>Add user</button>
    </div>
      <h2>Users List</h2>
      <button onClick={() => dispatch(adduser(nameRef.current.value))}>Fetch Users</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
    
}
