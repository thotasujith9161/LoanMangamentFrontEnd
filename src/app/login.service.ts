import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  message:any
  session:any = null;

  constructor(private http:HttpClient, private router:Router) { }

  public login(username:string,password:string){
    const headers = new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)});
    let resp = this.http.get("http://localhost:8080/",{headers,responseType:'text' as 'json'});
    resp.subscribe(data => {
      // this.message=data;
      console.log(data);
      if(data == "authenticated successfully"){
        this.session = {username: 'javatalent'}
        this.router.navigate(["/home"]);

      }
    },
    error => {
      console.log(error);
      if(error.status == "401"){
        window.alert("Invalid Username/Password");
      }
    })
  }

  
  logout(){
    this.session=null;
    // alert("Logout successful");
    this.router.navigate(["/login"])
  }


}
