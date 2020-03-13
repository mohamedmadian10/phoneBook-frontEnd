import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { User } from 'src/app/_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../features/modal-content/modal-content.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userservice : UserService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  users:User[]=[];
  ngOnInit() {
     this.userservice.getAllUsers().subscribe((users)=>{
       this.users = users;
     })
     this.userservice.onUserListChanged.subscribe((isChanged)=>{
       if(isChanged !== null){
           this.userservice.getAllUsers().subscribe(users=>{
           this.users = users
         })
       }
     })
     
  }
  deleteUser(id){
    if (confirm('Are you Sure?'))
    this.userservice.deleteUser(id).subscribe((user)=>{
      // console.log(user)
      user.id = id;
    })
    this.userservice.onUserListChanged.next(true)
  }

  openModalWithComponent(formType,id) {
    const initialState = {
      list: [],
      title: 'Add User',
      formType: formType,
      id:id
      

    };
    console.log(id)
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState,
      backdrop : 'static',
      keyboard : false
    });
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }

}
