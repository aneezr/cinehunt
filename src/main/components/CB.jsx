import React,{useState,useEffect} from "react";

import MovieFilterIcon from '@mui/icons-material/MovieFilter';

import notFound from "./../../static/download.png" ;


const CB = ({movies,setUiState}) => {

    const [cbMovies,setCbMovies] = useState([]);

    const [renderMov,setRenderMov] = useState([]);

    const [refresh,setRefresh] = useState(0);



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
        console.log(options)
            fetch("http://localhost:8000/movieget/recomendation/",options)
            .then(res => res.json())
            .then(data => {
                setCbMovies([...cbMovies,data.movie_name])
                console.log(cbMovies)
            })
        })

    },[movies])
    const getCB = (movie_name) =>{
        var endpoint = "http://localhost:8000/movieget/details/"+movie_name;
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json' 
            }
        };
        fetch(endpoint, options)
            .then(response => response.json())
            .then(data => {var movie = data;
                    console.log(movie)
                    if("i" in movie){
                        setRenderMov([...renderMov,{
                            name:movie.l,
                            y:movie.y,
                            poster:movie.i.imageUrl
                        }])      
                    }else{
                        setRenderMov([...renderMov,{
                            name:movie.l,
                            y:movie.y,
                            poster:notFound
                        }])
                    }
                setRefresh(refresh+1);
            })
            .catch(err => console.error(err));
    }

    return(
        <div className="main">
            <div className="main-header">
                <div className="logo"><MovieFilterIcon style={{color:"red",fontSize:"6vh",margin:"8px 5px 0 10px"}} />Cinehunt</div>
                <div></div>
            </div>
            <div className="main-body" style={{justifyContent:"center",alignItems:"center"}}>
                <div className="movie-con">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                        <div></div>
                        <div className="movie-select-title" style={{marginLeft:"12vw"}}>Similar Movies</div>
                        <div onClick={()=>{setUiState(1)}} style={{marginRight:"15px",backgroundColor:"green",borderRadius:"5px",padding:"5px 10px"}} >Get recommendations</div>
                    </div>
                    
                    <div className="movie-con-inner">
                    {
                        renderMov.map((item,idx) => 
                            <div key={idx} className="movie-con-inner-item">
                                <img src={item.poster} className="movie-poster"  />
                                <div>{item.name}({item.y})</div>
                            </div>
                        )
                    }
                    </div>
                    <div onClick={()=>{if(refresh < cbMovies.length){getCB(cbMovies[refresh]);}}} style={{backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>One More !</div>
                </div>
            </div>
        </div>
 
    )
}

export default CB;