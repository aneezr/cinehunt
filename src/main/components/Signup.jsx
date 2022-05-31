import React,{useState} from "react";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';


const SignUp = ({setNewSignIn}) => {

    const[fn,setFn] = useState("")
    const[p,setP] = useState("")
    const[em,setEm] = useState("")
    const[ln,setLn] = useState("")

    const onSubmit = () =>{
        if(fn!=="" && p!=="" && em!=="" && ln!==""){
            const options = {
                method:"POST",
                headers:{
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    "first_name": fn,
                    "last_name": ln,
                    "email_id": em,
                    "password": p
                })
            }
            fetch("http://localhost:8000/sign-up/",options)
                .then((res)=>res.json)
                .then((data)=>{console.log(data);setNewSignIn(0);})
                .catch((e)=>console.log(e))
        }
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
                    <div style={{fontWeight:"700",fontSize:"25px",marginTop:"30px"}}>Enter details</div>
                    <div className="signup-field">
                        <input type="text" class="form__field" placeholder="frist name" name="name" id='name' required value={fn} onChange={(e)=>{setFn(e.target.value)}} />
                        <input type="text" class="form__field" placeholder="last name" name="name" id='name' required value={ln} onChange={(e)=>{setLn(e.target.value)}} />
                        <input type="email" class="form__field" placeholder="email" name="name" id='name' required value={em} onChange={(e)=>{setEm(e.target.value)}} />
                        <input type="password" class="form__field" placeholder="password" name="name" id='name' required value={p} onChange={(e)=>{setP(e.target.value)}} />
                    </div>
                    <div>
                        <div onClick={() =>onSubmit()} className="login-button" style={{marginBottom:"15px",fontWeight:"500",fontSize:"18px"}}>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default SignUp;
