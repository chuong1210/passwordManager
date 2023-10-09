import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../service/password.service';
import { Observable } from 'rxjs';
import { Directive, ElementRef } from '@angular/core';
import { AES,enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})

export class PasswordListComponent implements OnInit {
  @ViewChild('inputFocus', { static: false })
   inputElement!: ElementRef;


siteId!:string;
siteName!:string;
siteUrl!:string;
siteImgUrl!:string;




passwordList!:Array<any>;


email!:string;
username!:string;
password!:string;
passwordId!:string;
formState:string='Add New';


successMessage!:string;
isSuccess:boolean=false;



Crypt:Array<string>=['Decrypt','Decrypt','Decrypt'];
enCrypt:boolean=false;
showAlert(message:string)
{
this.isSuccess=true;
this.successMessage=message;
}

  constructor(private route:ActivatedRoute,private passwordManagerService:PasswordService,private ef:ElementRef) {
this.route.queryParams.subscribe((val:any)=>{
  console.log((val));
  this.siteId=val.id;
  this.siteName=val.siteName;
  this.siteUrl=val.siteUrl;
this.siteImgUrl=val.siteImageurl;
}
);
this.loadPasswords();





   }

  ngOnInit() {
  }


  resetForm()
  {

    this.email='';
  this.username='';
  this.password="";
  this.passwordId='';
  this.formState='Add New';
  }



  onSubmit(values:any)
  {

console.log(values);
 const encryptedPassword=   this.encryptPasswrod(values.password);

values.password=encryptedPassword;
console.log(values);


    if(this.formState=== 'Add New')
    {

      console.log(values);
      this.passwordManagerService.addPassword(values,this.siteId).then(()=>
      {
this.showAlert("Data save Successfully");
        this.resetForm();
      }).catch(err=>{console.log(err)});
    }

    else
    {
this.passwordManagerService.updatePassword(this.siteId,this.passwordId,values).then((()=>{this.showAlert('Data updated Successfully');
this.resetForm();
})).catch(err=>{console.log(err);});
this.ngOnInit();
    }

  }


  loadPasswords()
  {
 this.passwordManagerService.loadPasswords(this.siteId).subscribe(val=>

  {
    this.passwordList=val;

  });
  }

  editPassword(email:string,username:string,password:string,passwordId:string)
  {
    this.inputElement.nativeElement.focus();

this.email=email;
this.username=username;
if(!this.enCrypt)
{
this.password=this.decryptPasswrod(password);
}
else
{
this.password=password;
}
this.passwordId=passwordId;
this.formState='Edit';
  }


  deletePassword(passwordId:string)
  {

    let confirmDel=confirm("Are you sure want to delete this Password?");
    if(!confirmDel) return;
    else
    {

this.passwordManagerService.deletePassword(this.siteId,passwordId).then(()=>{this.showAlert('Data has Deleted');})
.catch(err=>{console.log("Loi");});
  }

}


  encryptPasswrod(password:string)
  {
const secretKey='6B6C4FB26555CD5A77ECF24EFBFA9';
const encrypted=AES.encrypt(password,secretKey).toString();
return encrypted;
  }

  decryptPasswrod(password:string)
  {
const secretKey='6B6C4FB26555CD5A77ECF24EFBFA9'; //Phải cùng key với encrypt nếu ko sẽ ko hoạt động
const decrypted=AES.decrypt(password,secretKey).toString(enc.Utf8);
return decrypted;
  }


  onDecrypt(password:string,index:number)
  {
    if(this.Crypt[index]==='Decrypt')
    {
   const decPassword= this.decryptPasswrod(password);
   this.passwordList[index].password=decPassword;
   this.Crypt[index]='Encrypt';
   this.enCrypt=true;
    }


    else
    {
      const encryptPassword= this.encryptPasswrod(password);
      this.passwordList[index].password=encryptPassword;
      this.Crypt[index]='Decrypt';
      this.enCrypt=false;


    }


  }

  showPassword:boolean=false;
  notNull!:boolean;
  showMenu()
  {
    if (this.password !== null || this.password !== undefined) {
      this.showPassword=!this.showPassword;


        }
  }
}
