import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../service/password.service';
import { Router,Route } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 currentEmail!:string;



  constructor(private PasswordService:PasswordService,private router:Router) {
    this.currentEmail=this.PasswordService.getUserEmail();
    this.currentEmail = JSON.parse(localStorage.getItem("email") || "");


  }
  ngOnInit() {



  }



  logOut()
  {


    this.router.navigate(['/'])
this.PasswordService.logOut().then(()=>{console.log("log out successfully");}).catch(err=>{console.log(err);})
  }



}
