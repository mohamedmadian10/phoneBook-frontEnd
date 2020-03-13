import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private basurl :string = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  onUserListChanged = new BehaviorSubject<boolean>(null);

  getAllUsers(){
    return this.http.get<User[]>(this.basurl);
  }

  getuser(id:number){
    return this.http.get<User>(this.basurl + "/"+id)
  }

  addUser(user){
    return this.http.post(this.basurl ,user)
  }

  editUser(user:User,id){
    return this.http.put(`${this.basurl}/${id}`,user)
  }
  
  deleteUser(id:number){
    return this.http.delete<User>(this.basurl + "/" + id)
  }

  

}




  

