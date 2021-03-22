import {AfterViewInit, Component,Inject, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';
import {MatDialog} from '@angular/material/dialog';
import {DialogElementComponent} from './dialog-element/dialog-element.component'
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AddUserComponent} from './add-user/add-user.component';
import {UpdateUserComponent} from './update-user/update-user.component';

export interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name:string;
  avatar: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  AllUserData: any = [];

  displayedColumns: string[] = ['id','avatar', 'first_name','last_name', 'email','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService:UserService,public dialog:MatDialog,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef) {
    //get all user data
    this.userService.getAllUsers().subscribe(data=>{
    this.AllUserData=data;
    console.log(this.AllUserData.data);
    this.dataSource= new MatTableDataSource<UserData>(this.AllUserData.data)
    })

  }

   openDeleteDialog(row):void {
    const dialogRef = this.dialog.open(DialogElementComponent,{
      width:'300px',
      data:row
    });
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addUser(){
    this._bottomSheet.open(AddUserComponent);
  }

  openUpdateSheet(row){
    this._bottomSheet.open(UpdateUserComponent,{panelClass:'',data:row})

  }

}
