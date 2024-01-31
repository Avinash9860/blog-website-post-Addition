import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  //userData!: Observable<any>;
  categoryArray: Category[] | undefined;
  formCategory :any ;
  formStatus :string ='Add';
  categoryId :any;
  
  
  
  
  constructor(private CategoriesService :CategoriesService) {}
  ngOnInit(): void {
   this.CategoriesService.getData("categories").subscribe((data)=>{
    this.categoryArray=data;
   })
  }


  onSubmit(FormData: any) {
    if(this.formStatus=='Add'){

    
    let categoryData : Category = {
      category: FormData.value.category,
      id: ''
    };
    this.CategoriesService.getData("categories").subscribe((data)=>{
      this.categoryArray=data;
     })
    this.CategoriesService.saveData(categoryData);
    FormData.reset();
   
  }else{
    this.CategoriesService.updateData(this.categoryId,this.formCategory);
    this.formStatus='Add'
    FormData.reset();
  }
  
  }
  onEdit(categorydata:any ){
    this.formCategory=categorydata.category;
    this.categoryId =categorydata.id
    this.formStatus='Edit'
    console.log(this.categoryArray);
    
   
  }
  onDelete(categorydata:any ){
    this.categoryId =categorydata.id;
    this.formCategory=categorydata.category;
    this.CategoriesService.DeleteData(this.categoryId);
  //  / categorydata.reset();
    
  }
  
  

  // getData() {
  //   const collectioninstance = collection(this.Firestore, 'users');
  //   collectionData(collectioninstance, { idField: 'id' }).subscribe((val) => {
  //     console.log(val);
  //   });
  //   this.userData = collectionData(collectioninstance, { idField: 'id' });
  // }

  // updateData(id: string) {
  //   const docInstance = doc(this.Firestore, 'users', id);
  //   const updateData = {
  //     category: 'Avinash adasdasdasd',
  //   };

  //   updateDoc(docInstance, updateData)
  //     .then(() => {
  //       console.log('Data Updated!!!');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // deleteData(id: string) {
  //   const docInstance = doc(this.Firestore, 'users', id);
  //   deleteDoc(docInstance).then(() => {
  //     console.log('Data Deleted');
  //   });
  // }
}
