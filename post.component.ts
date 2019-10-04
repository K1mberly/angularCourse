import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit{
    posts;

    constructor(private service: PostService){
    }

    ngOnInit(){
        this.service.getPosts() 
        .subscribe(response => {
            this.posts = response;
            console.log(response);
        });
    }

    createPost(input: HTMLInputElement){
        let post = { title: input.value};
        input.value = ''; 

        this.service.createPost(post)
        .subscribe(response => {
            post['id'] = response['id'];
            this.posts.splice(0, 0, post)
            console.log(response);
        }, (error: AppError) => {
            if(error instanceof BadInput)
                alert('An expected error occurred.');
            else{
                throw error;
            }
        });
    }

    updatePost(post){
        this.service.updatePost(post)
        .subscribe(
            response =>{
                console.log(response);
            }
        );
    }

    deletePost(post){
        // this.service.deletePost(post.id)
        this.service.deletePost(45554)
        .subscribe(
            response =>{
                let index = this.posts.indexOf(post);
                this.posts.splice(index, 1);
            }, 
            (error: AppError) => {
                if(error instanceof NotFoundError)
                    alert('This post has already been deleted.');
                else{
                    throw error;
                }
            });
    }
}
