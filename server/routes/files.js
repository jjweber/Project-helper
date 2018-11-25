const express = require('express');
const router = express.Router();

const moment = require('moment');
const passport = require('passport');
const excelToJson = require('convert-excel-to-json');

const http = require('http');
const fs = require('fs');

/**************************/
/* Route for getting jobs */
router.get('/', (req, res) => {
  console.log('File Api Here!');
});

/*************************************/
/* Route for getting Steel Pipe Data */
router.get('/steelPipeData', (req, res) => {
  console.log('Retrieving Data For Steel Pipes!');

  fs.readFile('steelPipe_weightChart.xlsx', (err, data) => {
    if (err) throw err;

    const steelPipeData = excelToJson({
      sourceFile: 'steelPipe_weightChart.xlsx',
      header:{
          rows: 2
      },
      columnToKey: {
          'A': 'schedule',
          'B': 'dia',
          'C': 'pipeWeightEmpty',
          'D': 'pipeWeightFull'
      }
    });
    const steelPipeDataArray = [];
    steelPipeData.Sheet1.forEach(element => {
      steelPipeDataArray.push(element);
    });
    console.log(steelPipeDataArray);

    res.send(steelPipeDataArray);
  });
});

/*************************************/
/* Route for getting Copper Tubing Data */
router.get('/copperTubingData', (req, res) => {
  console.log('Retrieving Data For Copper Tubing Data!');

  fs.readFile('copperTubing_weightChart.xlsx', (err, data) => {
    if (err) throw err;

    const copperTubingData = excelToJson({
      sourceFile: 'copperTubing_weightChart.xlsx',
      header:{
          rows: 2
      },
      columnToKey: {
          'A': 'type',
          'B': 'dia',
          'C': 'pipeWeightEmpty',
          'D': 'pipeWeightFull'
      }
    });
    const copperTubingDataArray = [];
    copperTubingData.Sheet1.forEach(element => {
      copperTubingDataArray.push(element);
    });
    console.log(copperTubingDataArray);

    res.send(copperTubingDataArray);
  });
});

/***********************************/
/* Route for getting PVC Pipe Data */
router.get('/pvcPipeData', (req, res) => {
  console.log('Retrieving Data For PVC Pipe Data!');

  fs.readFile('pvcPipe_weightChart.xlsx', (err, data) => {
    if (err) throw err;

    const pvcPipeData = excelToJson({
      sourceFile: 'pvcPipe_weightChart.xlsx',
      header:{
          rows: 2
      },
      columnToKey: {
        'A': 'schedule',
        'B': 'dia',
        'C': 'pipeWeightEmpty',
        'D': 'pipeWeightFull'
      }
    });
    const pvcPipeDataArray = [];
    pvcPipeData.Sheet1.forEach(element => {
      pvcPipeDataArray.push(element);
    });
    console.log(pvcPipeDataArray);

    res.send(pvcPipeDataArray);
  });
});

/************************************************/
/* Route for getting No-Hub Cast Iron Pipe Data */
router.get('/noHubCastIronPipeData', (req, res) => {
  console.log('Retrieving Data For No-Hub Cast Iron Pipe Data!');

  fs.readFile('noHub_castIronPipe_weightChart.xlsx', (err, data) => {
    if (err) throw err;

    const noHubCastIronPipeData = excelToJson({
      sourceFile: 'noHub_castIronPipe_weightChart.xlsx',
      header:{
          rows: 2
      },
      columnToKey: {
          'A': 'dia',
          'B': 'pipeWeightEmpty',
          'C': 'pipeWeightFull'
      }
    });
    const noHubCastIronPipeDataArray = [];
    noHubCastIronPipeData.Sheet1.forEach(element => {
      noHubCastIronPipeDataArray.push(element);
    });
    console.log(noHubCastIronPipeDataArray);

    res.send(noHubCastIronPipeDataArray);
  });
});

module.exports = router;
