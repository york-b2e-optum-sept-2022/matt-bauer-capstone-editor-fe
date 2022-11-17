import { Injectable } from '@angular/core';
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "./_Interfaces/IProcess";
import {HttpService} from "./http.service";
import {IFinishedProcess} from "./_Interfaces/IFinishedProcess";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  $responseList = new BehaviorSubject<IFinishedProcess[]>([])


  constructor(private httpService: HttpService) {
    this.getAllResponses()
  }


  getAllResponses(){
    this.httpService.getAllResponses().pipe(first()).subscribe({
      next: list => {
        this.$responseList.next(list)
      },
      error: err => {}
    })
  }
}
