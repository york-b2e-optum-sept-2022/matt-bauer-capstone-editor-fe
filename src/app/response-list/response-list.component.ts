import { Component, OnInit } from '@angular/core';
import {ResponseService} from "../response.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {IFinishedProcess} from "../_Interfaces/IFinishedProcess";

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnInit {
  onDestroy$ = new Subject()
  responseList: IFinishedProcess[] = []
  selectedResponse: IFinishedProcess | null = null

  constructor(private responseService: ResponseService) {
    this.responseService.$responseList.pipe(takeUntil(this.onDestroy$)).subscribe(
list => this.responseList = list
    )
  }

  ngOnInit(): void {
  }

  onViewResponseClick(response: IFinishedProcess) {
    this.selectedResponse = response
  }

  onBackClick() {
    this.selectedResponse = null
  }
}
