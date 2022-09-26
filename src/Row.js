import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import './row.css'


const baseUrl = 'https://image.tmdb.org/t/p/original/';

const Row = ({title,fetchUrl, isLargeRow}) => {
  const [movies , setMovies] = useState([]);
  const [trailerUrl ,setTrailerUrl] = useState('');
  

  useEffect(()=>{
   async function fetchData(){
     const request = await axios.get(fetchUrl);
     setMovies(request.data.results)
     return request;
   }
   fetchData();
  },[fetchUrl]);


  const options = {
   height:"400",
   width: "98.5%",
   playerVars:{
    autoplay:1,
   }
  };

  const hundleClick = (movie) =>{
    if(trailerUrl){
      setTrailerUrl('');
    }else{
      movieTrailer(movie?.name || "")
      .then((url)=>{
        const urlParams = new URLSearchParams(new URL(url).search);
       setTrailerUrl(urlParams.get('v'));
      }).catch((error)=> console.log(error));
    }
  }

  return (
    <div className='row'>
        <h2>{title}</h2>

        <div className='row_posters'>
            {movies.map(movie => (
                <img 
                    key={movie.id}
                    onClick = {()=> hundleClick(movie)}
                    className={`row_poster ${isLargeRow&& 'row_posterLarge'}`}
                    draggable={false}
                    src={`${baseUrl}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
            ))}
        </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts = {options} className='youtube_trailer'/>}
    </div>
  )
}

export default Row