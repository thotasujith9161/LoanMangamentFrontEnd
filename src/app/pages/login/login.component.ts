import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!:string;
  password!:string;

  constructor(private service:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  
  doLogin(){
    let resp = this.service.login(this.username,this.password);
    
  }

}
