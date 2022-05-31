import React,{useState,useEffect} from "react";

import CF from "./CF";
import CB from "./CB";
import SelectMovies from "./SelectMovies";

const Main = () =>{

    const [movies,setMovies] = useState([]);
    const [UiState,setUiState] = useState(0);
    const [cfMovies,setCfMovies] = useState([]);
    
    useEffect(()=>{
        console.log(movies)
    },[movies])

    return(
        UiState===0 ? <SelectMovies setCfMovies={setCfMovies} setUiState={setUiState} movies={movies} setMovies={setMovies} /> : UiState===1 ? <CF movies={cfMovies} setUiState={setUiState}  /> : UiState===2 ? <CB movies={movies} setUiState={setUiState} /> : null
    )
}

export default Main;