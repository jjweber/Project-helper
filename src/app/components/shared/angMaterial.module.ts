/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatPaginatorModule,
  MatRippleModule, MatProgressBar, MatProgressBarModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    CdkTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRippleModule,
    MatDividerModule,
  ],
  providers: [

  ],
  exports: [
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRippleModule,
    MatDividerModule
  ],
  bootstrap: []
})

export class AngMaterialModule { }
