import React, {useState,useEffect} from "react";

import MovieFilterIcon from '@mui/icons-material/MovieFilter';


const SelectMovies = ({setCfMovies,setUiState,movies,setMovies}) => {

    const [currMovie,setCurrMovie] = useState("");
    
    useEffect(()=>{
        console.log(movies)
    },[])

    const getMovies = (movie_name) =>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAP.I-Host': 'online-movie-database.p.rapidapi.com',
                'X-RapidAPI-Key': 'f2da4a06e0msha38e04d2a284eddp1b1590jsnf61830e3ba18'
            }
        };

        var movieList = movie_name.split(" ")
        var movie
        // https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr
        var endpoint = "https://online-movie-database.p.rapidapi.com/auto-complete?q="+movieList.map(item => item+"%20")
        fetch(endpoint, options)
            .then(response => response.json())
            .then(data => {movie = data.d[0];
                            console.log(movies);
                            setMovies([...movies,{
                                name:movie.l,
                                y:movie.y,
                                poster:movie.i.imageUrl}])
                            setCurrMovie("")})
            .catch(err => console.error(err));
    }

    const submitMovies = () =>{
        var r = []
        movies.map((item,idx) => {
            var rating = parseFloat(document.getElementById("rating-"+idx).value)
            r = [...r,rating];
        })
        console.log(r)
        var m = [] ;
        movies.map(item => {m = [...m,item.name+" ("+item.y+")"]})
        var options = {
            method: 'POST',
            headers
            :{
                "accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "movie_names":m 
            })
            
        };
        
        fetch("http://localhost:8000/movieget/movie_id/",options)
            .then(res => res.json())
            .then(data => {
                m = [];
                data.map((i)=>{m = [...m,parseInt(i.id)]});
                console.log(m)
                var options = {
                    method: 'POST',
                    headers:{
                        "accept": "application/json",
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        "usermovieids":m ,
                        "usermovierates":r,
                        "num":5
                    })   
                }
                fetch("http://localhost:8000/movieget/CF/",options)
                .then(res => res.json())
                .then(data => {
                    setCfMovies([...data])
                    console.log(data)
                    setUiState(1)}) 
                .catch(er => console.log(er))
        })
        .catch((e)=>console.log(e)) 
    } 


    return(
        <div className="main">
            <div className="main-header">
                <div className="logo"><MovieFilterIcon style={{color:"red",fontSize:"40px"}} />Cinehunt</div>
                <div></div>
            </div>
            <div className="main-body" style={{justifyContent:"center",alignItems:"center"}} >
                <div className="movie-con" >
                    <div className="movie-select-title">Select and rate your movies</div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <input type="text" id="add" key="add_key" class="Input-text" value={currMovie} onChange={(e) => setCurrMovie(e.target.value)} onKeyPress={(e)=>{if(e.key === "Enter"){getMovies(currMovie);}}} />
                        <div onClick={()=>{getMovies(currMovie);}} style={{marginLeft:"10px",backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>Add</div>
                        <div onClick={()=>{setMovies([]);}} style={{marginLeft:"10px",backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>Clear</div>
                    </div>
                    <div className="movie-con-inner">
                        {
                            movies ? movies.map((item,idx) => 
                            <div key={idx} className="movie-con-inner-item">
                                <img src={item.poster} className="movie-poster"  />
                                <div>{item.name}({item.y})</div>
                                <label>Add Rating</label>
                                <select name="rating" id={"rating-"+idx}>
                                    <option  value="1">1</option>
                                    <option value="1.5" selected>1.5</option>
                                    <option value="2">2</option>
                                    <option value="2.5">2.5</option>
                                    <option value="3">3</option>
                                    <option value="3.5">3.5</option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                </select>
                            </div>) : null
                        }
                    </div>
                    <div onClick={()=>{submitMovies()}} style={{marginLeft:"10px",backgroundColor:"black",borderRadius:"5px",padding:"10px 20px"}} >Get recommendations</div>
                </div>
            </div>
        </div>
    )
}

export default SelectMovies;

