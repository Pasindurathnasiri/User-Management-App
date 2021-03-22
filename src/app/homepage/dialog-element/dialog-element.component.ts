import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../../shared/user.service';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';

export interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name:string;
  avatar: string;
}

@Component({
  selector: 'app-dialog-element',
  templateUrl: './dialog-element.component.html',
  styleUrls: ['./dialog-element.component.css']
})
export class DialogElementComponent implements OnInit {

  constructor(public dialog:MatDialog,public dialogRef: MatDialogRef<DialogElementComponent>,@Inject(MAT_DIALOG_DATA) public data: UserData,public userservice:UserService) {
    
  }

  ngOnInit(): void {
  }

  //delete user 
  deleteUser(){
   this.userservice.deleteUser(this.data.id).subscribe(res=>{
    const rs="Succesfully Deleted";
    this.openMessageDialog(rs);
   },
   err=>{
   const er="Failed"
   this.openMessageDialog(er);
   });
   this.dialogRef.close();
  }

  //open message dialog box
  openMessageDialog(e):void {
    const dialogRef = this.dialog.open(MessageDialogComponent,{
      width:'300px',
      data:{message:e}
    });
  }

}
