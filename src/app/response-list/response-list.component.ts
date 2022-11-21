import { Component, OnInit } from '@angular/core';
import {ResponseService} from "../response.service";
import { Subject, takeUntil} from "rxjs";
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
  displayList: IFinishedProcess[] = []
  fromDate: Date = new Date()
  toDate: Date = new Date()
  isFilteringDates: boolean = false

  constructor(private responseService: ResponseService) {
    this.responseService.$responseList.pipe(takeUntil(this.onDestroy$)).subscribe(
list => {this.responseList = list
this.displayList = list}
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

  filterResponses(filterText: any) {
    this.displayList = [...this.responseList]
    if (filterText.target.value === "" || filterText.target.value === null) {
      return
    }
    const regexp = new RegExp(filterText.target.value, 'i')
    let filteredList = this.displayList.filter(response => regexp.test(response.surveyTitle))
    this.displayList = filteredList
  }

  onDateRangeSearchClick() {
    this.displayList = [...this.responseList]
    let filteredList = this.displayList.filter(response => response.dateFinished >= this.fromDate
    && response.dateFinished <= this.toDate)
    this.displayList = filteredList
    this.isFilteringDates = true
  }

  onClearClick(){
    this.displayList = [...this.responseList]
    this.isFilteringDates = false
    this.fromDate = new Date()
    this.toDate = new Date()
  }

}
