import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore,collection,addDoc ,collectionData,doc,updateDoc,deleteDoc} from '@angular/fire/firestore';
import { getDocs, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Auth ,signInWithEmailAndPassword,signOut,sendEmailVerification} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  email!:string;
  allSite!:Observable<any[]>;


constructor(private Firestore:Firestore ,private af:AngularFirestore,private auth:Auth) {
}
addSite(data:object)
{
const dbInstance=collection(this.Firestore,'sites');
return addDoc(dbInstance,data);
}

loadSites()
{

  const collectionInstance = collection(this.Firestore, 'sites');
  const queryInstance = query(collectionInstance); // Create a Firestore query
  return collectionData(queryInstance,{idField:'id'});



}

addToFireStore(data: any) {
  const collectionInstance = collection(this.Firestore, 'sites')
  return addDoc(collectionInstance, data)

}


 getDataFromFirestore(  myArray: any[] = []  ) {
  // const collectionRef = collection(this.Firestore, 'sites')
  //   const querySnapshot = await getDocs(collectionRef);
  //   return querySnapshot;
const rs=this.af.collection("sites").valueChanges({idField:"id"});
  this.af
  .collection("sites")
  .get()
  .subscribe((ss) => {
    ss.docs.forEach((doc) => {
myArray.push( doc.data());

    });
  });

  return rs;


}

updateSite(id:string,data:object)
{

  const docInstace=doc(this.Firestore,'sites',id);
  return updateDoc(docInstace,data);

}


deleteSite(id:string)
{
  const docInstace=doc(this.Firestore,'sites',id);
  return deleteDoc(docInstace);

}

get2Site()
{
  const docInstace=doc(this.Firestore,'sites');
  const collectionInstance = collection(this.Firestore, 'sites');
  return getDocs(collectionInstance);

}







//PASSWORD QUERIES

addPassword(data:object,siteId:string)
{
  const dbInstance=collection(this.Firestore,`/sites/${siteId}/passwords/`);
  return addDoc(dbInstance,data);

}



loadPasswords(siteId:string)
{
const rs=this.af.collection(`/sites/${siteId}/passwords/`).valueChanges({idField:"id"});

  const dbInstance=collection(this.Firestore,`/sites/${siteId}/passwords/`);
  // return collectionData(dbInstance,{idField:'id'});
  return rs;
}

updatePassword(siteId:string,passwordId:string,data:object)

{
const docInstance=doc(this.Firestore,`/sites/${siteId}/passwords/`,passwordId);
return updateDoc(docInstance,data);
return this.af.doc(`/sites/${siteId}/passwords/${passwordId}`).update(data);

}



deletePassword(siteId:string,passwordId:string)
{
  const docInstantce=doc(this.Firestore,`/sites/${siteId}/passwords/`,passwordId);
  return deleteDoc(docInstantce);
}



//login

login(email:string,password:string)
{
return signInWithEmailAndPassword(this.auth,email,password);
}


//logout

logOut()
{
return signOut(this.auth);
}
setUserEmail(email: string) {
  this.email =email;

}

getUserEmail() {
  return this.email;
}


}


