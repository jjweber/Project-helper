import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngMaterialModule } from './components/shared/angMaterial.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PipeWeightsComponent } from './components/pipe-weights/pipe-weights.component';
import { UploadExcelFileComponent } from './components/upload-excel-file/upload-excel-file.component';
import { DuctWeightsComponent } from './components/duct-weights/duct-weights.component';

import { FileReaderService } from './services/fileReader/file-reader.service';

import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PipeWeightsComponent,
    UploadExcelFileComponent,
    DuctWeightsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    AppRouting,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AngMaterialModule
  ],
  providers: [FileReaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
