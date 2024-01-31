import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private Toastrservice: ToastrService,
    private Firestore: Firestore,
    private router: Router
  ) {}

  // async uploadImage(selectedimage: any) {
  //   const filePath = `postIMG/${Date.now()}`;
  //   //console.log(filePath);
  //  const uploadtask = await this.afs.upload(filePath,selectedimage)
  //  const url = await uploadtask.ref.getDownloadURL();
  //     this.Toastrservice.success('Image Upload successfully!!!');

  // }

  savePostData(postData: any) {
    const collectioninstance = collection(this.Firestore, 'posts');
    addDoc(collectioninstance, postData)
      .then((docid) => {
        this.Toastrservice.success('Data save successfully!!!');
        this.router.navigate(['/posts']);
      })
      .catch((error) => {
        console.log(error);
        this.Toastrservice.error('Error while Inserting Data');
      });
  }

  getpostData(): Observable<any> {
    const collectionInstance = collection(this.Firestore, 'posts');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  async getonePostData(postId: any) {
    const collectionInstance = doc(this.Firestore, 'posts', postId);

    //const avi =collectionInstance;
    const mydata = await getDoc(collectionInstance);
    return mydata.data();
  }

  updateData(id: string, postData: any) {
    const docInstance = doc(this.Firestore, 'posts', id);

    updateDoc(docInstance, postData)
      .then(() => {
        this.Toastrservice.success('Data Update successfully!!!');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

   deleteData(id: string) {
    const docInstance = doc(this.Firestore, 'posts', id);
    deleteDoc(docInstance).then(() => {
      this.Toastrservice.warning('Data Deleted successfully!!!');
    });
  }

  markFeatured(id:any,featuredvalue:any){
    const docInstance = doc(this.Firestore, 'posts', id);
   

    updateDoc(docInstance, featuredvalue)
      .then(() => {
        this.Toastrservice.info('Your Featured is Updated!!!! ');
        //this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
