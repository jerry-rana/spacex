import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private baseUrl = "https://api.spaceXdata.com/v3/launches"

  constructor(private http: HttpClient) { }
  
  listPrograms(
    launch_year: number = 2006,
    launch_success: any = '',
    land_success: any = ''
    ): Observable<any> { 
    const url = `${this.baseUrl}?limit=100&launch_year=${launch_year}&launch_success=${launch_success}&land_success=${land_success}`;
    return this.http
    .get(url)
    .pipe(
      map((data: any[]) => {
        return data;
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: Response){
    return Observable.throw(error || 'Server error')
  }

}
