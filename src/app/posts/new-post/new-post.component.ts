import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/service/categories.service';
import { PostService } from 'src/app/service/post.service';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  categoryArray: Category[] | undefined;
  category: [] | undefined;
  categoryedited: any;
  postForm: any;
  categoryID!:string ;
  permalink: string = '';
  formStatus:String='Add New';
  
  imgSrc: any = './assets/image-placeholder.png';
  selectedImage: any = '';
  constructor(
    private CategoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostService,
    private Toastrservice: ToastrService,
    private Firestore: Firestore,
    private route: ActivatedRoute,
   
  ) {
    // this.route.queryParams.subscribe(val=>{
    //  console.log(val);
    //  let data= this.postService.getonePostData(val['id'])
    //   console.log(data);

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postimg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.CategoriesService.getData('categories').subscribe((data) => {
      this.categoryArray = data;
    });
    this.onEdit();
  }
  get fc() {
    return this.postForm.controls;
  }

  onTitleChange(Title: any) {
    const title = Title.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showpreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    console.log(reader);
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];

    // if (this.selectedImage) {
    //   const filePath = `postIMG/${Date.now()}`;
    //   const uploadtask = await this.afs.upload(filePath, this.selectedImage);
    //   const url = await uploadtask.ref.getDownloadURL();
    // }

    //console.log(filePath);

    this.Toastrservice.success('Image Upload successfully!!!');
  }

  onSubmit() {
   
    let splitted = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: this.selectedImage.name,
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: Timestamp.now(),
      id: '',
    };
    if(this.formStatus=='Add New'){
      this.savePostData(postData);
    }else{
      this.postService.updateData(this.categoryID,postData);
      this.postForm.reset();
    }
    
  }

  savePostData(postData: any) {
    this.postService.savePostData(postData);
    this.postForm.reset();
    this.imgSrc = './assets/image-placeholder.png';
  }
  onEdit() {

    this.route.queryParams.subscribe((val) => {
      this.categoryID=val['id']
    
      this.postService.getonePostData(val['id']).then((data) => {
       
        this.postForm.patchValue(data);
        this.formStatus='Edit'
        if (data != undefined) {
        //   this.postForm.patchValue['category'] =((data['category']['categoryId'])+'-'+(data['category']['category']));
        // //  this.categoryedited = data['category']['id'];
        // //  this.categoryArray = this.category;

        // //  console.log(this.categoryedited);
        // this.postForm = this.fb.group({
         
         
        //   category: [`${data['category'].categoryId}-${data['category'].category}`],
          
        // });
      
        }
      });
    });
  }
}
