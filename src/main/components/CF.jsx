import React,{useState,useEffect} from "react"

import notFound from "./../../static/download.png" ;


const CF = ({movies,setUiState}) => {


    const [cfMovies,setCfMovies] = useState([]);
    const [refresh,setRefresh] = useState(1);

    const getCfMovies = (movie_name) =>{
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
                            if("i" in movie){
                                setCfMovies([...cfMovies,{
                                    name:movie.l,
                                    y:movie.y,
                                    poster:movie.i.imageUrl
                                }])      
                            }else{
                                setCfMovies([...cfMovies,{
                                    name:movie.l,
                                    y:movie.y,
                                    poster:notFound
                                }])
                            }
                })
            .catch(err => console.error(err));
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
                        <div className="movie-select-title" style={{marginLeft:"10vw"}}>You may like this movies</div>
                        <div onClick={()=>setUiState(2)} style={{marginRight:"10px",backgroundColor:"green",borderRadius:"5px",padding:"5px 10px"}}>Get similar movies</div>     
                    </div>
                    <div className="movie-con-inner">
                    {
                    
                        cfMovies.map((item,idx) => 
                        <div key={idx} className="movie-con-inner-item">
                            <img src={item.poster} className="movie-poster"  />
                            <div>{item.name}({item.y})</div>
                        </div>
                        )
                    
                    }
                    </div>
                    <div onClick={()=>{if(refresh<movies.length){getCfMovies(movies[refresh]);setRefresh(refresh+1);}}} style={{backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>One More !</div>
                </div>
            </div>
        </div>
    )
};


export default CF;