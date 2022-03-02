import React,{useState} from "react";

function App() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function loginUser(e){
    e.preventDefault();

    const response = await fetch("https://mern-amit2.herokuapp.com/api/login",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        email,password
      }),
    })

    const data = await response.json();
    if(data.user){
      localStorage.setItem('token',data.user);
      alert("Login Successful");
      window.location.href = "/dashboard"
    }else{
      alert("Invalid Credentials! Please check your email or password");
    }
  }


  return (
    <div className="login">
      <h1>Login</h1>
      <form  onSubmit={loginUser} className="form-group">
        
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" required/>
        <br/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required/>
        <br/>
        <button type="submit" value="login" className="btn btn-primary">Login</button>
        
      </form>
    </div>
  );
}

export default App;
