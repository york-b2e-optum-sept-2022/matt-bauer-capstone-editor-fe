import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProcess} from "./_Interfaces/IProcess";
import {Observable} from "rxjs";
import {IFinishedProcess} from "./_Interfaces/IFinishedProcess";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private hostURL: String = "http://10.110.87.54:8080"

  constructor(private httpClient: HttpClient) {
  }

  createProcess(title: string): Observable<IProcess> {
    return this.httpClient.post(this.hostURL + "/api/process", title
    ) as Observable<IProcess>
  }

  getAllProcesses(): Observable<IProcess[]> {
    return this.httpClient.get(this.hostURL + "/api/process"
    ) as Observable<IProcess[]>
  }

  updateProcess(process: IProcess): Observable<IProcess> {
    return this.httpClient.put(this.hostURL + "/api/process", process
    ) as Observable<IProcess>
  }

  deleteProcess(id: number): Observable<IProcess> {
    return this.httpClient.put(this.hostURL + `/api/process/delete?id=${id}`, {}
    ) as Observable<IProcess>
  }

  getAllResponses(): Observable<IFinishedProcess[]> {
    return this.httpClient.get(this.hostURL + "/api/response"
    ) as Observable<IFinishedProcess[]>
  }
}
