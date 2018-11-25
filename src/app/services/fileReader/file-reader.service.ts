import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, Subject, of, throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SteelPipeDataItem } from '../../models/steelPipeItem';
import { CopperTubingDataItem } from '../../models/copperTubingItem';
import { PvcPipeDataItem } from '../../models/pvcPipeItem';
import { NoHubCastIronPipeDataItem } from '../../models/noHubCastIronPipeItem';

@Injectable()
export class FileReaderService {

  // private userJobsObs$ = new Subject<Job>();
  // private jobToDisplay: Job;
  // private appliedJobToView: Job;
  // private userJobsAppliedTo: any[];
  // private currentUser: any;
  private _filesRoute = '/api/files/';

  private headerOptions = new RequestOptions({headers: new Headers({ 'Content-Type': 'application/json'})});

  private currentUser: any;

  constructor(private _http: Http) { }

  getSteelPipeData(): Observable<SteelPipeDataItem[]> {
    return this._http.get(this._filesRoute + 'steelPipeData').pipe(
      map((response: Response) => response.json())
    );
  }

  getCopperTubingData(): Observable<CopperTubingDataItem[]> {
    return this._http.get(this._filesRoute + 'copperTubingData').pipe(
      map((response: Response) => response.json())
    );
  }

  getPvcPipeData(): Observable<PvcPipeDataItem[]> {
    return this._http.get(this._filesRoute + 'pvcPipeData').pipe(
      map((response: Response) => response.json())
    );
  }

  getNoHubCastIronPipeData(): Observable<NoHubCastIronPipeDataItem[]> {
    return this._http.get(this._filesRoute + 'noHubCastIronPipeData').pipe(
      map((response: Response) => response.json())
    );
  }
}

