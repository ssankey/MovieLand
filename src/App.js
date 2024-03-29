import {useEffect,useState} from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";
//6fd7848

const API_URL = 'https://www.omdbapi.com?apikey=6fd7848';


const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search); 
    }

useEffect(() =>{
searchMovies({searchTerm});
},[searchTerm]);

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        searchMovies(searchTerm);
    }
}


return(
    <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
            <input
                placeholder="Search For Movies"
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={(e) =>setSearchTerm(e.target.value)}
            />  
            <img 
                src={SearchIcon}
                alt = "Search"
                onClick={(e) => searchMovies(searchTerm) }
            />
        </div>
        {movies?.length>0?(
            <div className="container">{
                movies.map((movie) =>(
                    <MovieCard movie = {movie}/>
                ))
            }
            </div>
            ) : (
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )
        }
    </div>
);
}
export default App;