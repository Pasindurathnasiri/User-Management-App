import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { HomepageComponent } from './homepage/homepage.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogElementComponent } from './homepage/dialog-element/dialog-element.component';
import {MatInputModule} from '@angular/material/input';
import { AddUserComponent } from './homepage/add-user/add-user.component';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { MessageDialogComponent } from './homepage/message-dialog/message-dialog.component';
import { UpdateUserComponent } from './homepage/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DialogElementComponent,
    AddUserComponent,
    MessageDialogComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
