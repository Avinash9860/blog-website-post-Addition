import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  PostData: Post[] | undefined;
  id!: string;
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.getData();
  
  }
  Delete(id: any) {
    this.postService.deleteData(id);
    this.getData();
  }
  getData(){
    this.postService.getpostData().subscribe((data) => {
      this.PostData = data;
      console.log(this.PostData);
    });
  }
  onFeatured(id:any,featuredvalue:any){
    const featuredData ={
      isFeatured:featuredvalue
    };
    this.postService.markFeatured(id,featuredData)

  }
}
