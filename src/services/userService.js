import http from "./HttpServices";

const apiEndPonit ="/users" ;

export function register(user){
   return http.post( apiEndPonit ,{
        email:user.username,
        password:user.password,
        name:user.name
    })
}