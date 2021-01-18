import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatRadioModule} from '@angular/material/radio'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
