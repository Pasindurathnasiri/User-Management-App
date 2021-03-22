import { Component, OnInit,Inject,Optional } from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { UserService} from '../../shared/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component'
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

export interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name:string;
  avatar: string;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  message:string;
  public userGroup:FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private formBuilder:FormBuilder,public dialog:MatDialog,public userService:UserService,private _bottomSheetRef: MatBottomSheetRef<UpdateUserComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: UserData ) { 
    this.userGroup= this.formBuilder.group({
      id:[data.id],
      first_name:[data.first_name],
      last_name:[data.last_name],
      email:[data.email],
      pic_path:[data.avatar]
    })
  }

  ngOnInit(): void {
  }

  onCancel(){
   this._bottomSheetRef.dismiss()
  }

  onUpdateUser(){
    var id=this.userGroup.value.id;
    this.userService.updateUser(id,this.userGroup.value).subscribe(
      res=>{
        const rs="User Updated Successfully";
        this.openMessageDialog(rs);
    },
    err=>{
       const er="User Update Attempt failed"
       this.openMessageDialog(er);
    }
    )
    this.onCancel();
    
  }

  openMessageDialog(e):void {
    const dialogRef = this.dialog.open(MessageDialogComponent,{
      width:'300px',
      data:{message:e}
    });
  }

}
