import React, { useState } from "react";
import "../styles/theme.css";


const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");


 const handleLogin = async (e) => {
   e.preventDefault();


   const res = await fetch("http://localhost:5001/api/auth/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email, password }),
   });


   const data = await res.json();
   console.log(data);


   if (data.token) {
     localStorage.setItem("token", data.token);
     alert("Login successful 🌿");
   } else {
     alert(data.error);
   }
 };


 return (
   <div className="auth-container">
     <div className="auth-card">
       <h1>🌿 OUTSY</h1>
       <p className="tagline">Reconnect. Breathe. Grow.</p>


       <form onSubmit={handleLogin}>
         <input
           type="email"
           placeholder="Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
         />


         <input
           type="password"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
         />


         <button type="submit" className="auth-btn">
           Log In
         </button>
       </form>


       <p className="switch-text">
         Don’t have an account? Register
       </p>
     </div>
   </div>
 );
};


export default Login;
