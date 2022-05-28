import React from "react";


const Login = ({setIsLoggedIn,setNewSignIn}) => {
    return(
        <div className="main">
            <div className="main-header">
                    <div className="logo">Cinehunt</div>
                    <div></div>
            </div>
            <div className="main-body">
                <div></div>
                <div className="login-con">
                    <div style={{fontWeight:"700",fontSize:"25px",marginTop:"30px"}}>Sign In</div>
                    <div>
                        <div style={{marginBottom:"30px"}}>
                            <div style={{marginBottom:"15px",fontWeight:"500",fontSize:"20px"}}>username</div>
                            <input type="text" />
                        </div>
                        <div>
                            <div style={{marginBottom:"15px",fontWeight:"500",fontSize:"20px"}}>password</div>
                            <input type="password" />
                        </div>
                    </div>
                    <div>
                        <div onClick={() => setIsLoggedIn(1)} className="login-button">login</div>
                        <div onClick={() => setNewSignIn(1)} className="login-button" style={{marginBottom:"15px",fontWeight:"500",fontSize:"18px"}}>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Login;
