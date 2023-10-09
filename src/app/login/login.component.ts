import { Component, Input, OnInit } from '@angular/core';
import { PasswordService } from '../service/password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private PasswordService:PasswordService,private router:Router) {

  }

  isError:boolean=false;


  ngOnInit() {
  }


  onSubmit(values:any)
  {
this.PasswordService.login(values.email,values.password).then(()=>
{
  this.router.navigate(['/site-list']);
  this.PasswordService.setUserEmail(values.email);
  localStorage.setItem('email', JSON.stringify(values.email));



}).catch(err=>{
  console.log(err);
  this.isError=true;


})



  }





}
