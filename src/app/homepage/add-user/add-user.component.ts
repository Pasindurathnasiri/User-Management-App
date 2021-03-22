import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { UserService} from '../../shared/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component'
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  message:string;
  public userGroup:FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private formBuilder:FormBuilder,public dialog:MatDialog,public userService:UserService,private _bottomSheetRef: MatBottomSheetRef<AddUserComponent>) { 
    this.userGroup= this.formBuilder.group({
      first_name:[],
      last_name:[],
      email:[],
      pic_path:[]
    })
  }

  ngOnInit(): void {
  }

  //add user
  onAddUser(){
    this.userService.registerUser(this.userGroup.value).subscribe(
      res=>{
          const rs="User Registration Successful";
          this.openMessageDialog(rs);
      },
      err=>{
         const er="User Registration failed"
         this.openMessageDialog(er);
      }
    )
  }

  //close bottom sheet
  onCancel(){ 
     this._bottomSheetRef.dismiss();
  }

  //open message dialog box
  openMessageDialog(e):void {
    const dialogRef = this.dialog.open(MessageDialogComponent,{
      width:'300px',
      data:{message:e}
    });
  }

}
