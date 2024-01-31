import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  userData!: Observable<any>;
  constructor(
    private Firestore: Firestore,
    private Toastrservice: ToastrService
  ) {}

  saveData(categoryData: any) {
    const collectioninstance = collection(this.Firestore, 'categories');
    addDoc(collectioninstance, categoryData)
      .then((docid) => {
        this.Toastrservice.success('Data save successfully!!!');
      })
      .catch((error) => {
        console.log(error);
        this.Toastrservice.error('Error while Inserting Data');
      });
  }

  getData(category: any): Observable<any> {
    const collectionInstance = collection(this.Firestore, category);
    return collectionData(collectionInstance, { idField: 'id' }); 
  }

  updateData(id: string, EditData: string) {
    const docInstance = doc(this.Firestore, 'categories', id);
    const updateData = {
      category: EditData,
    };

    updateDoc(docInstance, updateData)
      .then(() => {
        this.Toastrservice.success('Data Updated Sucessfully!!!');
      })
      .catch((err) => {
        console.log(err);
        this.Toastrservice.error('Error while  Update Data');
      });
  }

  DeleteData(id: string) {
    const docInstance = doc(this.Firestore, 'categories', id);

    
    deleteDoc(docInstance).then(() => {
      this.Toastrservice.success('Data Deleted Sucessfully!!!!');
      
    })
  
  }
}
