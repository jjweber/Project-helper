import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, TransitionCheckState} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import * as XLSX from 'xlsx';

import { FileReaderService } from './../../services/fileReader/file-reader.service';
import { SteelPipeDataItem } from '../../models/steelPipeItem';
import { CopperTubingDataItem } from '../../models/copperTubingItem';
import { PvcPipeDataItem } from '../../models/pvcPipeItem';
import { NoHubCastIronPipeDataItem } from '../../models/noHubCastIronPipeItem';

interface FilteredRowInfo {
  conduit: string;
  scheduleOrType: string;
  dia: string;
  weightEmpty: number;
  weightFull: number;
  quantity: number;
  useEmptyWeight: boolean;
  weightTimesQuantity: number;
}

@Component({
  selector: 'app-pipe-weights',
  templateUrl: './pipe-weights.component.html',
  styleUrls: ['./pipe-weights.component.css']
})
export class PipeWeightsComponent implements OnInit {
  @ViewChild('dataFilteredSort') dataFilteredSort: MatSort;
  dataSource: MatTableDataSource<any>;
  dataFilteredColumns: string[];

  newSteelPipeDataItem: SteelPipeDataItem;
  newCopperTubingDataItem: CopperTubingDataItem;
  newPvcPipeDataItem: PvcPipeDataItem;
  newNoHubCastIronPipeDataItem: NoHubCastIronPipeDataItem;
  matchingItemFoundAfterFilter: any = {};

  steelPipeDataRetreivedFromExcel: SteelPipeDataItem[] = [];
  copperTubingDataRetreivedFromExcel: CopperTubingDataItem[] = [];
  pvcPipeDataRetreivedFromExcel: PvcPipeDataItem[] = [];
  noHubCastIronPipeDataRetreivedFromExcel: NoHubCastIronPipeDataItem[] = [];
  dataFilteredByScheduleOrType: any[] = [];
  dataFilteredByDiameter: any[] = [];
  displayedRowArray: any[] = [];
  schedulesArray: any[] = [];
  typesArray: any[] = [];
  diametersArray: any[] = [];

  conduitValue = '';
  scheduleValue = '';
  typeValue = '';
  diaValue = '';
  checked = false;
  validForm = false;
  isNewData = false;
  totalPipeWeight = 0;

  constructor(
    private _fileReaderService: FileReaderService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.checked === true) {
      this.dataFilteredColumns = ['conduit', 'dia', 'weightEmpty', 'weightFull', 'quantity', 'delete'];
    } else {
      this.dataFilteredColumns = ['conduit', 'dia', 'weightFull', 'quantity', 'delete'];
    }
  }

  resetValues() {
    this.steelPipeDataRetreivedFromExcel = [];
    this.copperTubingDataRetreivedFromExcel = [];
    this.pvcPipeDataRetreivedFromExcel = [];

    this.scheduleValue = '';
    this.typeValue = '';
    this.diaValue = '';

    this.dataFilteredByScheduleOrType = [];
    this.dataFilteredByDiameter = [];
    this.schedulesArray = [];
    this.typesArray = [];
    this.diametersArray = [];

    this.matchingItemFoundAfterFilter = {};

    this.checkForm();

    this.totalPipeWeight = 0;
  }

  upDateTableData() {
    if (this.displayedRowArray.length > 0) {
      this.dataSource = new MatTableDataSource(this.displayedRowArray);
    } else {
      this.dataSource = new MatTableDataSource();
    }
    this.dataSource.sort = this.dataFilteredSort;
    this.dataSource.sortingDataAccessor = (data, header) => data[header];
  }

  checkForm() {
    let passesChecks = true;

    if (this.conduitValue) {
      if (!this.diaValue) {
        passesChecks = false;
      }
    } else {
      passesChecks = false;
    }
    this.validForm = passesChecks;
  }

  conduitSelectChanged(event: any) {
    this.resetValues();

    if (this.conduitValue === 'Steel Pipe') {
      this.getSteelPipeDataFromExcel();
    }
    if (this.conduitValue === 'Copper Tubing') {
      this.getCopperTubingDataFromExcel();
    }
    if (this.conduitValue === 'PVC Pipe') {
      this.getPvcPipeDataFromExcel();
    }
    if (this.conduitValue === 'Cast Iron Pipe') {
      this.getNoHubCastIronPipeDataFromExcel();
    }

    this.checkForm();
  }

  getSteelPipeDataFromExcel() {
    this._fileReaderService.getSteelPipeData().subscribe(fileSearchResults => {
      fileSearchResults.forEach(element1 => {
        this.newSteelPipeDataItem = new SteelPipeDataItem();
        this.newSteelPipeDataItem.schedule = element1.schedule;
        if (this.schedulesArray.indexOf(this.newSteelPipeDataItem.schedule) === -1) {
          this.schedulesArray.push(this.newSteelPipeDataItem.schedule);
        }
        this.newSteelPipeDataItem.dia = element1.dia;
        this.newSteelPipeDataItem.pipeWeightEmpty = element1.pipeWeightEmpty;
        this.newSteelPipeDataItem.pipeWeightFull = element1.pipeWeightFull;
        this.newSteelPipeDataItem.quantity = 0;
        this.steelPipeDataRetreivedFromExcel.push(this.newSteelPipeDataItem);
      });
    });
  }

  getCopperTubingDataFromExcel() {
    this._fileReaderService.getCopperTubingData().subscribe(fileSearchResults => {
      fileSearchResults.forEach(element2 => {
        this.newCopperTubingDataItem = new CopperTubingDataItem();
        this.newCopperTubingDataItem.type = element2.type;
        if (this.typesArray.indexOf(this.newCopperTubingDataItem.type) === -1) {
          this.typesArray.push(this.newCopperTubingDataItem.type);
        }
        this.newCopperTubingDataItem.dia = element2.dia;
        this.newCopperTubingDataItem.pipeWeightEmpty = element2.pipeWeightEmpty;
        this.newCopperTubingDataItem.pipeWeightFull = element2.pipeWeightFull;
        this.newCopperTubingDataItem.quantity = 0;
        this.copperTubingDataRetreivedFromExcel.push(this.newCopperTubingDataItem);
      });
    });
  }

  getPvcPipeDataFromExcel() {
    this._fileReaderService.getPvcPipeData().subscribe(fileSearchResults => {
      fileSearchResults.forEach(element3 => {
        this.newPvcPipeDataItem = new PvcPipeDataItem();
        this.newPvcPipeDataItem.schedule = element3.schedule;
        if (this.schedulesArray.indexOf(this.newPvcPipeDataItem.schedule) === -1) {
          this.schedulesArray.push(this.newPvcPipeDataItem.schedule);
        }
        this.newPvcPipeDataItem.dia = element3.dia;
        this.newPvcPipeDataItem.pipeWeightEmpty = element3.pipeWeightEmpty;
        this.newPvcPipeDataItem.pipeWeightFull = element3.pipeWeightFull;
        this.newPvcPipeDataItem.quantity = 0;
        this.pvcPipeDataRetreivedFromExcel.push(this.newPvcPipeDataItem);
      });
    });
  }

  getNoHubCastIronPipeDataFromExcel() {
    this.dataFilteredByScheduleOrType = [];
    this.dataFilteredByDiameter = [];
    this.diametersArray = [];
    this.matchingItemFoundAfterFilter = {};
    this.diaValue = '';

    this._fileReaderService.getNoHubCastIronPipeData().subscribe(fileSearchResults => {
      fileSearchResults.forEach(element4 => {
        this.newNoHubCastIronPipeDataItem = new NoHubCastIronPipeDataItem();
        this.newNoHubCastIronPipeDataItem.dia = element4.dia;

        // Did not work with for loop in getDiametersForSelect method.
        // Only 1 set of diameters, so passing straight to diaArray.
        this.diametersArray.push(this.newNoHubCastIronPipeDataItem.dia);

        this.newNoHubCastIronPipeDataItem.pipeWeightEmpty = element4.pipeWeightEmpty;
        this.newNoHubCastIronPipeDataItem.pipeWeightFull = element4.pipeWeightFull;
        this.newNoHubCastIronPipeDataItem.quantity = 0;

        // Cast Iron Pipe Data has no schedule or type select.
        // So after data is retrieved pass it to filtered array to work with the rest of the functionality.
        this.dataFilteredByScheduleOrType.push(this.newNoHubCastIronPipeDataItem);
      });
    });
    this.checkForm();
  }

  filterByScheduleOrType(event: any) {
    this.dataFilteredByScheduleOrType = [];
    this.dataFilteredByDiameter = [];
    this.diametersArray = [];
    this.matchingItemFoundAfterFilter = {};
    this.diaValue = '';

    if (this.conduitValue === 'Steel Pipe') {
      this.steelPipeDataRetreivedFromExcel.forEach(steelPipe => {
        if (steelPipe.schedule.toString() === this.scheduleValue.toString()) {
          this.dataFilteredByScheduleOrType.push(steelPipe);
        }
      });
    }
    if (this.conduitValue === 'Copper Tubing') {
      this.copperTubingDataRetreivedFromExcel.forEach(copperTube => {
        if (copperTube.type.toString() === this.typeValue) {
          this.dataFilteredByScheduleOrType.push(copperTube);
        }
      });
    }
    if (this.conduitValue === 'PVC Pipe') {
      this.pvcPipeDataRetreivedFromExcel.forEach(pvcPipe => {
        if (pvcPipe.schedule.toString() === this.scheduleValue.toString()) {
          this.dataFilteredByScheduleOrType.push(pvcPipe);
        }
      });
    }
    this.getDiametersForSelect();
    this.checkForm();
  }

  getDiametersForSelect() {
    this.dataFilteredByScheduleOrType.forEach(arrayItem2 => {
      if (this.diametersArray.indexOf(arrayItem2.dia) === -1) {
        this.diametersArray.push(arrayItem2.dia);
      }
    });
  }

  filterByDiameter(event: any) {
    this.dataFilteredByDiameter = [];
    this.matchingItemFoundAfterFilter = {};
    this.dataFilteredByScheduleOrType.forEach(filteredByScheduleOrType => {
      if (filteredByScheduleOrType.dia === this.diaValue) {
        this.matchingItemFoundAfterFilter = filteredByScheduleOrType;
      }
    });
    console.log('Results After Filter: ', this.matchingItemFoundAfterFilter);
    this.checkForm();
  }

  checkBoxClicked(event) {
    this.checked = event.checked;
    if (this.checked === true) {
      this.dataFilteredColumns = ['conduit', 'dia', 'weightEmpty', 'weightFull', 'quantity', 'delete', 'emptyCheckBox'];
    } else {
      this.dataFilteredColumns = ['conduit', 'dia', 'weightFull', 'quantity', 'delete'];
    }
    this.upDateTableData();
  }

  createRow() {
    if (this.matchingItemFoundAfterFilter.dia) {
      const newRowInfo = {} as FilteredRowInfo;
      newRowInfo.conduit = this.conduitValue;
      if (this.conduitValue === 'Steel Pipe') {
        newRowInfo.scheduleOrType = this.matchingItemFoundAfterFilter.schedule;
      }
      if (this.conduitValue === 'Copper Tubing') {
        newRowInfo.scheduleOrType = this.matchingItemFoundAfterFilter.type;
      }
      if (this.conduitValue === 'PVC Pipe') {
        newRowInfo.scheduleOrType = this.matchingItemFoundAfterFilter.schedule;
      }
      if (this.conduitValue === 'Cast Iron Pipe') {
        newRowInfo.scheduleOrType = 'No-Hub';
      }
      newRowInfo.dia = this.matchingItemFoundAfterFilter.dia;
      newRowInfo.weightEmpty = Number(this.matchingItemFoundAfterFilter.pipeWeightEmpty);
      newRowInfo.weightFull = Number(this.matchingItemFoundAfterFilter.pipeWeightFull);
      newRowInfo.quantity = (Number(this.matchingItemFoundAfterFilter.quantity));
      newRowInfo.useEmptyWeight = false;
      newRowInfo.weightTimesQuantity = 0;

      let isNewItem = true;

      this.displayedRowArray.forEach(existingItems => {
        if (existingItems.conduit === newRowInfo.conduit && existingItems.scheduleOrType === newRowInfo.scheduleOrType &&
          existingItems.dia === newRowInfo.dia) {
          isNewItem = false;
        }
      });

      this.isNewData = isNewItem;

      if (this.isNewData) {
        this.displayedRowArray.push(newRowInfo);
        this.upDateTableData();
      } else {
        this.snackBar.open('This item is already in the table!', 'Unsuccessful', {
          duration: 9000
        });
      }
    }
  }

  clearTable() {
    this.displayedRowArray = [];
    this.upDateTableData();
    this.displayTotalWeight();
  }

  removeRow(row) {
    console.log('Row data to remove: ', row);
    const itemIndex = this.displayedRowArray.indexOf(row);
    if (itemIndex > -1) {
      this.displayedRowArray.splice(itemIndex, 1);
    }
    this.upDateTableData();
    this.getTotalWeightForRow(event, row);
  }

  rowcheckBoxClicked(event, row) {
    console.log('Event: ', event);
    row.useEmptyWeight = event.checked;
    console.log('Row data: ', row);
    this.getTotalWeightForRow(event, row);
  }

  getTotalWeightForRow(event: any, row: any) {
    setTimeout(e => {
      if (this.checked === true) {
        if (row.useEmptyWeight === true) {

          if (row.quantity !== null && row.quantity > 0) {
            console.log('Use Empty Weight!');
            row.weightTimesQuantity = (row.weightEmpty * row.quantity);
          } else {
            console.log('Quantity was 0 or bellow!');
            row.quantity = 0;
          }
        } else {
          if (row.quantity !== null && row.quantity > 0) {
            console.log('Use Full Weight!');
            row.weightTimesQuantity = (row.weightFull * row.quantity);
          } else {
            console.log('Quantity was 0 or bellow!');
            row.quantity = 0;
          }
        }
      } else {
        if (row.quantity !== null && row.quantity > 0) {
          console.log('Use Full Weight!');
          row.weightTimesQuantity = (row.weightFull * row.quantity);
        } else {
          console.log('Quantity was 0 or bellow!');
          row.quantity = 0;
        }
      }
      console.log('Row Data with Weight: ', row);
      this.displayTotalWeight();
    }, 1000);
  }

  displayTotalWeight() {
    this.totalPipeWeight = 0;
    if (this.displayedRowArray.length > 0) {
      this.displayedRowArray.forEach(rowItem => {
        this.totalPipeWeight += rowItem.weightTimesQuantity;
      });
    }
  }
}
