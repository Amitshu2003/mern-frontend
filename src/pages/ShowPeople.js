import React from 'react'

function ShowPeople({item,deletePeople}) {

    function deleteUser(){
        const id = item._id;
        deletePeople(id);
    }
    
  return (
    <div className='user'>        
        <span>Username : {item.username}</span>
        <span>Email: {item.email}</span>
        <span>Phone: {item.phone}</span>
        <span>Address: {item.address}</span>
        <button onClick={deleteUser} class="btn btn-primary">Delete</button>
    </div>
  )
}

export default ShowPeople