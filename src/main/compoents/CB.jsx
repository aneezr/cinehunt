import React,{useState,useEffect} from "react";

const CB = ({movies,setState}) => {

    const [cbMovies,setCbMovies] = useState([]);

    // var movies = [{name:"Othello",y:1995,poster:""}];
    useEffect(()=>{
        console.log(movies)
        movies.map((item) => {
            var options = {
                method: 'POST',
                headers:{
                    "accept": "application/json",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "title": item.name+" ("+item.y+")",
                    "count": 1
                })  
            };
            fetch("http://localhost:8000/movieget/recomendation/",options)
            .then(res => res.json())
            .then(data => {
                setCbMovies([...cbMovies,data.movie_name])
                console.log(data)})
        })

    },[movies])
    const getCB = () =>{
        
    }

    return(
        <div className="main">
            <div className="main-header">
                <div className="logo">Cinehunt</div>
                <div></div>
            </div>
            <div className="main-body" style={{justifyContent:"center",alignItems:"center"}}>
                <div className="movie-con">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                        <div></div>
                        <div className="movie-select-title" style={{marginLeft:"12vw"}}>Similar Movies</div>
                        <div onClick={()=>{setState(1)}} style={{marginRight:"15px",backgroundColor:"green",borderRadius:"5px",padding:"5px 10px"}} >Get recommendations</div>
                    </div>
                    
                    <div className="movie-con-inner">
                    {
                        cbMovies.map((item) => 
                        <div>
                            <image  />
                            <div>item.name</div>
                        </div>
                        )
                    }
                    </div>
                    <div style={{backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>Refresh</div>
                </div>
            </div>
        </div>
 
    )
}

export default CB;