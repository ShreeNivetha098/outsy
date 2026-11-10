import React, { useState } from "react";
import "../styles/theme.css";


const Register = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");


 const handleRegister = async (e) => {
   e.preventDefault();


   const res = await fetch("http://localhost:5001/api/auth/register", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ name, email, password }),
   });


   const data = await res.json();
   console.log(data);


   if (data.message) {
     alert("Account created 🌱");
   } else {
     alert(data.error);
   }
 };


 return (
   <div className="auth-container">
     <div className="auth-card">
       <h1>🌿 OUTSY</h1>
       <p className="tagline">Start your grounding journey.</p>


       <form onSubmit={handleRegister}>
         <input
           type="text"
           placeholder="Name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
         />


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
           Register
         </button>
       </form>
     </div>
   </div>
 );
};


export default Register;
