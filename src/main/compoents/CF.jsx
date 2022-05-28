import React,{useState,useEffect} from "react"


const CF = ({movies,setUiState}) => {


    const [cfMovies,setCfMovies] = useState([]);
    const [refresh,setRefresh] = useState(0);

    const getCfMovies = (movie_name) =>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
                'X-RapidAPI-Key': '521a044184msh91b0b141a81f4d8p1457d2jsn1a4c849526c5'
            }
        };

        var movieList = movie_name.split(" ")
        var movie
        // https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr
        var endpoint = "https://online-movie-database.p.rapidapi.com/auto-complete?q="+movieList.map(item => item+"%20")
        fetch(endpoint, options)
            .then(response => response.json())
            .then(data => {movie = data.d[0];
                            setCfMovies([...cfMovies,{
                                name:movie.l,
                                y:movie.y,
                                poster:movie.i.imageUrl
                            }])})
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
                    <div onClick={()=>{getCfMovies(movies[refresh]);setRefresh(refresh+1);}} style={{backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>More</div>
                </div>
            </div>
        </div>
    )
};


export default CF;