import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/_service/user.service";
import { User } from "src/app/_models/user";
import { ActivatedRoute } from "@angular/router";
import { phoneNumberValidator } from "../../../validation/phone-validator";

@Component({
  selector: "app-modal-content",
  templateUrl: "./modal-content.component.html",
  styleUrls: ["./modal-content.component.css"]
})
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  AddOrEdit: FormGroup;
  formType: string;
  id: number;

  newuser: User = new User(0, "", "");

  constructor(
    public bsModalRef: BsModalRef,
    private userservice: UserService,
    private arout: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getuser(this.id);
    if (this.formType === "Add") {
      this.AddOrEdit = new FormGroup({
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3)
        ]),
        phonenumber: new FormControl("", [
          Validators.required,
          Validators.maxLength(11),
          phoneNumberValidator
        ])
      });
    } else {
      this.title = "Edit User";
      this.newuser.id = this.id;
      // console.log("id", this.id, this.newuser.name);
      this.AddOrEdit = new FormGroup({
        name: new FormControl(this.newuser.name, [
          Validators.required,
          Validators.minLength(3)
        ]),
        phonenumber: new FormControl(this.newuser.phonenumber, [
          Validators.required,
          Validators.maxLength(11),
          phoneNumberValidator
        ])
      });
    }

    this.onAddOrEdit(this.AddOrEdit.value, this.newuser.id);
  }

  getuser(id) {
    this.userservice.getuser(id).subscribe(res => {
      this.newuser = res;
    });
  }

  onAddOrEdit(user, id) {
    if (this.formType === "Add") {
      this.userservice.addUser(this.AddOrEdit.value).subscribe(newuser => {
        // console.log(newuser);
      });
    } else {
      this.userservice
        .editUser(this.AddOrEdit.value, this.newuser.id)
        .subscribe(updatedUser => {
          user = updatedUser;
        });
    }
    this.userservice.onUserListChanged.next(true);

    this.bsModalRef.hide();
  }

  get phoneNumber() {
    return this.AddOrEdit.get("phonenumber");
  }
  get name() {
    return this.AddOrEdit.get("name");
  }
}
