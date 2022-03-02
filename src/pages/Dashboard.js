import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import ShowPeople from "./ShowPeople";

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        alert("you have to login to see this page!!")
        navigate("/login");
      } else {
        populateUser();
      }
    }
    else{
      navigate("/login")
    }
  }, []);


  async function populateUser() {
    const req = await fetch("https://mern-amit2.herokuapp.com/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
   
    const data = await req.json();
    
    if (data.status === "ok") {
      setResults(data.users)
    } else {
      alert(data.error);
      navigate("/login")
    }
    
  }


  async function addUser(e) {
    e.preventDefault();

    const req = await fetch("https://mern-amit2.herokuapp.com/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username:username,
        phone:mobile,
        address:address,
        email:email
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
    alert("User added successfully!!!");
      setUsername("");
      setEmail("");
      setAddress("");
      setMobile("");
      setResults(data.users)
      


    } else {
      if(data.message==="token expired"){
        alert("Your session is expired, Please login again!");
        navigate("/login");
      }
      else{
        alert(data.error);
        // navigate("/login")
      }
      

    }
    
    console.log(data);
  }

  async function deletePeople(id){
  
    const req = await fetch(`https://mern-amit2.herokuapp.com/api/quote/${id}`,{method:"DELETE", headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    }});
    const data = await req.json();
    if (data.status === "ok") {
      setResults(data.users)
    } else {
      alert("Your session is expired, Please login again!");
      navigate("/login");
    }

   
  }
  return (
    <div style={{display:"flex"}} class="container">
      <div style={{width:"50%"}} className="row">
      <div class="left col-8">
      <h1>Tab 1</h1>
      <form onSubmit={addUser} className="form-group">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter username"
          class="form-control"
          required
        />
        <br />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter phone number"
          class="form-control"
          required
        />
        <br/>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          class="form-control"
          required
        />
        <br />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Address"
          class="form-control"
          required
        />
        <br />
        <input type="submit" class="btn btn-primary" value="add user" />
      </form>
      </div>
        </div>
      <div id="right" class="col-6">
      <h1>Tab 2</h1>
      {
        results.map((item, index)=>
          <ShowPeople key={index} item={item} deletePeople={deletePeople} />
        )
      }
      </div>
    </div>
  );
}

export default Dashboard;
