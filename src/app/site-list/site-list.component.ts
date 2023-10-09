import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../service/password.service';
import { Observable } from 'rxjs';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';



@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {


  allSite!:Observable<Array<any>>;
  myArray: any[] = [];

  siteName!:string;
  siteUrl!:string;
  siteImgUrl!:string; //phải đúng vs tên ngmodoel
  siteId!:string;


  formState: string = "Add New";
  successMessage!:string;


  isSuccess:boolean=false;


  currentEmail!:string;


  constructor(private passwordMangager:PasswordService  ,private af:AngularFirestore) {
this.loadSites();
this.currentEmail = JSON.parse(localStorage.getItem("email") || "");

   }

  ngOnInit() {


  }


showAlert(message:string)
{
this.isSuccess=true;
this.successMessage=message;
}

  onSubmit(values:object)
  {

    if(this.formState==="Add New")
    {
      this.passwordMangager.addToFireStore(values)
      .then(()=>
  {
this.showAlert(`Data Saved Successfully`);
  })
  .catch((err)=>
  {
    console.log(err);
  });
    }

    else if(this.formState==="Edit")
    {
this.passwordMangager.updateSite(this.siteId,values)
.then(()=>
  {
    this.showAlert(`Data Edited Successfully`);
  }).catch((err)=>
  {
    console.log(err);
  });
    }

  }

   loadSites()
  {



this.passwordMangager.loadSites().subscribe(value=>{console.log(value)});
this.passwordMangager.getDataFromFirestore().subscribe(value=>{console.log(value)});


this.allSite=this.passwordMangager.getDataFromFirestore();
  }


  editSite(siteName:string,siteUrl:string,siteImgUrl:string,id:string)
  {
this.siteName=siteName;
this.siteUrl=siteUrl;
this.siteImgUrl=siteImgUrl;
this.siteId=id;


this.formState="Edit";
  }


  deleteSite(id:string)
  {
    const confirmDel=confirm("Are you sure want to delete this manager?");
    if(!confirmDel) return
    else
    {

this.passwordMangager.deleteSite(id).then(()=>
{
  this.showAlert(`Data Deleted Successfully`);
})
.catch(err=>
  {
    console.log(err);
  })
    }
  }
}
