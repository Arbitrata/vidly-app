import http from "./HttpServices"

export function getGenres() {
    return http.get("/genres" )
  }
  