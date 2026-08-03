import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login(){


const navigate = useNavigate();


const [form,setForm]=useState({

email:"",
password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};




const login=async(e)=>{

e.preventDefault();


try{


const res =
await axios.post(

"http://127.0.0.1:5000/login",

form

);



localStorage.setItem(
"token",
res.data.token
);


localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);



alert(
"Login Successful"
);



navigate("/");


}

catch(error){

console.log(error);

alert(
"Invalid Login"
);

}


};





return(

<div

style={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:"#f8faff"

}}

>


<div

style={{

background:"#fff",

padding:"40px",

width:"400px",

borderRadius:"20px",

boxShadow:
"0 10px 30px rgba(0,0,0,.1)"

}}

>


<h2>
🛡️ Insurance Login
</h2>



<form onSubmit={login}>


<input

className="form-control mb-3"

placeholder="Email"

name="email"

value={form.email}

onChange={handleChange}

/>



<input

className="form-control mb-3"

placeholder="Password"

type="password"

name="password"

value={form.password}

onChange={handleChange}

/>



<button

className="btn btn-primary w-100"

>

Login

</button>


</form>


</div>


</div>


);


}


export default Login;