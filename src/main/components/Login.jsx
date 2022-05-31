import React,{useState} from "react";

import MovieFilterIcon from '@mui/icons-material/MovieFilter';



const Login = ({setIsLoggedIn,setNewSignIn}) => {

    const[p,setP] = useState("")
    const[em,setEm] = useState("")

    const onSubmit = () =>{
        const options ={
            method:"POST",
            headers:{
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "username": em,
                "password": p
            })
        }
        console.log(options)
        fetch("http://localhost:8000/login/",options)
            .then((res)=>{if(res.status==200){setIsLoggedIn(1)}})
            .catch((e)=>console.log(e))
    }

    return(
        <div className="main">
            <div className="main-header">
                    <div className="logo"><MovieFilterIcon style={{color:"red",fontSize:"6vh",margin:"8px 5px 0 10px"}} />Cinehunt</div>
                    <div></div>
            </div>
            <div className="main-body">
                <div></div>
                <div className="login-con">
                    <div style={{fontWeight:"700",fontSize:"25px",marginTop:"30px"}}>Sign In</div>
                    <div className="signup-field" style={{height:"40%"}}>
                        <input type="input" class="form__field" placeholder="Username" name="name" id='name' required value={em} onChange={(e)=>{setEm(e.target.value)}} />
                        <input type="password" class="form__field" placeholder="Password" name="name" id='name' required value={p} onChange={(e)=>{setP(e.target.value)}} />
                    </div>
                    <div>
                        <div onClick={() => {onSubmit()}} style={{marginBottom:"10px",fontWeight:"500",fontSize:"22px"}} className="login-button">login</div>
                        <div onClick={() => setNewSignIn(1)} className="login-button" style={{marginBottom:"15px",fontWeight:"500",fontSize:"18px"}}>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Login;
