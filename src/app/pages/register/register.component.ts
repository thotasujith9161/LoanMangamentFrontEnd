import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm!: FormGroup;
  constructor(private fb:FormBuilder) { 
    this.signUpForm = this.fb.group({
      'dispalyName':['', Validators.required],
      'email':['', Validators.required],
      'password':['', Validators.required],

    })
  }

  ngOnInit(): void {
  }

  signup(){
    alert("Account Created! ☺️")
  }

}
