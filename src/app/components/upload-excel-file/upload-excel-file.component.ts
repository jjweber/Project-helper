import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-upload-excel-file',
  templateUrl: './upload-excel-file.component.html',
  styleUrls: ['./upload-excel-file.component.css']
})
export class UploadExcelFileComponent implements OnInit {
  data: AOA = [[1, 2], [3, 4]];
  dataWithKeys: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  excelDataArray: any = [];

  constructor() { }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log('Ws: ', ws);

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, {header: 1});
      this.dataWithKeys = <AOA>XLSX.utils.sheet_to_json(ws, { header: [
        'schedule', 'pipe weight empty Lbs/Lf', 'pipe weight full/insulated Lbs/Lf'
      ] });

      console.log('Data Object: ', this.data);

      for (let index = 0; index < this.dataWithKeys.length; index++) {

        if (index !== 0) {
          const element = this.dataWithKeys[index];
          this.excelDataArray.push(element);
        }
      }
/*
      this.data.forEach(element => {
        const rowData = {} as ExcelRowData;
        rowData.company = element[0];
        rowData.phone = element[1];
        rowData.price = element[2];
        this.excelDataArray.push(rowData);
        console.log('Foreach loop: ', rowData);
      });
*/
      console.log('Data Array: ', this.excelDataArray);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


}
