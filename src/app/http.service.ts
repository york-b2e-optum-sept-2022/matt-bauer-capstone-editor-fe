import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProcess} from "./_Interfaces/IProcess";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  createProcess(title: string):Observable<IProcess> {
    return this.httpClient.post("http://localhost:8080/api/process", title
    )as Observable<IProcess>
  }

  getAllProcesses(): Observable<IProcess[]>{
    return this.httpClient.get("http://localhost:8080/api/process"
    ) as Observable<IProcess[]>
  }


  updateProcess(process: IProcess): Observable<IProcess> {
    return this.httpClient.put("http://localhost:8080/api/process", process
    ) as Observable<IProcess>
  }

  deleteProcess(id: number): Observable<IProcess> {
    return this.httpClient.delete(`http://localhost:8080/api/process?id=${id}`
    ) as Observable<IProcess>
  }

}//end of class
