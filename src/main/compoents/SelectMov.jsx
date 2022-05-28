import React, {useState,useEffect,useRef} from "react";
import CF from "./CF";
import CB from "./CB";

const SelectMov = ({userInfo}) =>{

    const [movies,setMovies] = useState([]);

    const [UiState,setUiState] =useState(0);

    const [currMovie,setCurrMovie] = useState("");

    const [cfMovies,setCfMovies] = useState([]);
    const [cfRenderMovies,setCfRenderMovies] = useState([]);
    

    const cf = useRef([]);

    const getMovies = (movie_name) =>{
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
                            setMovies([...movies,{
                                name:movie.l,
                                y:movie.y,
                                poster:movie.i.imageUrl
                            }])})
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
    } 

    

    const SelectMovies = () => {
        return(
            <div className="main">
                <div className="main-header">
                    <div className="logo">Cinehunt</div>
                    <div></div>
                </div>
                <div className="main-body" style={{justifyContent:"center",alignItems:"center"}} >
                    <div className="movie-con" >
                        <div className="movie-select-title">Select and rate your movies</div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <input key="add-key" type="text" id="add" value={currMovie} onChange={(e) => setCurrMovie(e.target.value)} />
                            <div onClick={() => getMovies(currMovie) } style={{marginLeft:"10px",backgroundColor:"red",borderRadius:"5px",padding:"5px 10px"}}>Add</div>
                        </div>
                        <div className="movie-con-inner">
                            {
                                movies.map((item,idx) => 
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
                                </div>
                                )
                            }
                            
                        </div>
                        <div onClick={()=>{submitMovies()}} style={{marginLeft:"10px",backgroundColor:"black",borderRadius:"5px",padding:"5px 10px"}} >Get recommendations</div>
                    </div>
                </div>
            </div>
        )
    }

    return (    
        UiState===0 ? <SelectMovies /> : UiState===1 ? <CF movies={cfMovies} setUiState={setUiState}  /> : UiState===2 ? <CB movies={movies} setUiState={setUiState} /> : null
    )
};

export default SelectMov;

