import React from "react";


const SignUp = ({setNewSignIn}) => {
    return(
        <div className="main">
            <div className="main-header">
                    <div className="logo">Cinehunt</div>
                    <div></div>
            </div>
            <div className="main-body">
                <div></div>
                <div className="login-con">
                    <div style={{fontWeight:"700",fontSize:"25px",marginTop:"30px"}}>Sign Up</div>
                    <div>
                        <div>
                        <div style={{marginBottom:"15px",fontWeight:"500",fontSize:"20px"}}>First Name</div>
                            <input type="text" />
                        </div>
                        <div>
                        <div style={{marginBottom:"15px",fontWeight:"500",fontSize:"20px"}}>Last Name</div>
                            <input type="text" />
                        </div>
                        <div>
                        <div style={{marginBottom:"15px",fontWeight:"500",fontSize:"20px"}}>email</div>
                            <input type="email" />
                        </div>
                        <div>
                            <div style={{marginBottom:"15px",fontWeight:"500",fontSize:"20px"}}>password</div>
                            <input type="password" />
                        </div>
                    </div>
                    <div>
                        <div onClick={() => setNewSignIn(0)} className="login-button" style={{marginBottom:"15px",fontWeight:"500",fontSize:"18px"}}>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default SignUp;
