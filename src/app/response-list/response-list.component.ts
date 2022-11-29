import {Component, OnDestroy} from '@angular/core';
import {ResponseService} from "../response.service";
import {Subject, takeUntil} from "rxjs";
import {IFinishedProcess} from "../_Interfaces/IFinishedProcess";
import {IAccumulatedSurvey} from "../_Interfaces/IAccumulatedSurvey";
import {RESPONSE_TYPE} from "../process.service";

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnDestroy {
  onDestroy$ = new Subject()
  responseList: IFinishedProcess[] = []
  selectedResponse: IFinishedProcess | null = null
  displayList: IFinishedProcess[] = []
  fromDate: Date = new Date()
  toDate: Date = new Date()
  isFilteringDates: boolean = false
  viewOptionID: number = -1
  allResponsesByTitle: IAccumulatedSurvey | null = null

  constructor(private responseService: ResponseService) {
    this.responseService.$responseList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => {
        this.responseList = list
        this.displayList = list
      }
    )
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

  onViewResponseClick(response: IFinishedProcess) {
    this.selectedResponse = response
    this.viewOptionID = -1
  }

  onBackClick() {
    this.selectedResponse = null
    this.allResponsesByTitle = null
  }

  filterResponses(filterText: any) {
    this.displayList = [...this.responseList]
    if (filterText.target.value === "" || filterText.target.value === null)
      return
    const regexp = new RegExp(filterText.target.value, 'i')
    this.displayList = this.displayList.filter(response => regexp.test(response.surveyTitle))
  }

  onDateRangeSearchClick() {
    this.displayList = [...this.responseList]
    this.displayList = this.displayList.filter(response => response.dateFinished >= this.fromDate
      && response.dateFinished <= this.toDate)
    this.isFilteringDates = true
  }

  onClearClick() {
    this.displayList = [...this.responseList]
    this.isFilteringDates = false
    this.fromDate = new Date()
    this.toDate = new Date()
  }

  onViewOptionsClick(response: IFinishedProcess) {
    let listLength = this.getResponseListByTitle(response.surveyTitle).length
    if (listLength <= 1) {
      this.onViewResponseClick(response)
    } else this.viewOptionID = response.id
  }

  onViewAllFromSurveyClick(surveyTitle: string) {
    let responseByTitle = {} as IAccumulatedSurvey;
    responseByTitle.title = surveyTitle
    let responseListByTitle = this.getResponseListByTitle(surveyTitle)
    responseByTitle = this.addResponses(responseListByTitle, responseByTitle)
    this.allResponsesByTitle = this.getUniqueResponses(responseByTitle)
    this.viewOptionID = -1
  }

  private addResponses(responseListByTitle: IFinishedProcess[], responseByTitle: IAccumulatedSurvey) {
    responseByTitle.question = []
    for (let response of responseListByTitle) {
      for (let question of response.responseList) {
        let responseList = []
        let prompt = responseByTitle.question.find(q => q.prompt === question.prompt)
        if (!prompt) {
          responseList.push({response: question.response, percent: 0})
          responseByTitle.question.push(
            {
              prompt: question.prompt,
              responses: responseList,
              responseType: question.responseType
            }
          )
        }
        if (prompt) {
          let index = responseByTitle.question.findIndex(response => question.prompt === response.prompt)
          responseByTitle.question[index].responses.push({response: question.response, percent: 0})
        }
      }
    }
    return responseByTitle
  }

  private getUniqueResponses(responseByTitle: IAccumulatedSurvey) {
    for (let response of responseByTitle.question) {
      responseByTitle.numberOfResponses = response.responses.length
      for (let singleResponse of response.responses) {
        let numer = response.responses.filter(r => r.response === singleResponse.response).length
        singleResponse.percent = (numer / responseByTitle.numberOfResponses) * 100
      }
      if (response.responseType !== RESPONSE_TYPE.TEXT) {
        let responseSet = [...new Set(response.responses.map(r => r.response))]
        let responseListSet = [] as { response: string, percent?: number }[]
        responseSet.map(r => responseListSet.push({
          response: r,
          percent: response.responses.find(per => per.response === r)?.percent
        }))
        response.responses = responseListSet
      }
    }
    return responseByTitle
  }

  private getResponseListByTitle(title: string) {
    let responseListByTitle = [...this.responseList]
    return responseListByTitle.filter(response => response.surveyTitle === title)
  }
}
