import http from "./HttpServices";

const apiEndPonit = "/movies" ;

export function getMovies() {
   return http.get( apiEndPonit)
  };

  export function deleteMovie(movieId) {
   return http.delete(apiEndPonit + '/' + movieId);

  };
  
 export function saveMovie(movie) {
   if(movie._id) {
      const body = { ...movie};
      delete body._id;
         http.put(apiEndPonit + "/" + movie._id ,body );
   }
 return http.post(apiEndPonit , movie)
 }

export function getMovie(moviId) {
   return http.delete(apiEndPonit + '/' + moviId);
 }
 