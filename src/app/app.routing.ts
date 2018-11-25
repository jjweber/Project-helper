import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PipeWeightsComponent } from './components/pipe-weights/pipe-weights.component';
import { DuctWeightsComponent } from './components/duct-weights/duct-weights.component';
import { UploadExcelFileComponent } from './components/upload-excel-file/upload-excel-file.component';

const appRoutes: Routes = [
  { path: '', component: PipeWeightsComponent, pathMatch: 'full' },
  { path: 'pipeWeights', component: PipeWeightsComponent, pathMatch: 'full' },
  { path: 'ductWeights', component: DuctWeightsComponent, pathMatch: 'full' },
  { path: 'uploadExcelSheet', component: UploadExcelFileComponent, pathMatch: 'full' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
