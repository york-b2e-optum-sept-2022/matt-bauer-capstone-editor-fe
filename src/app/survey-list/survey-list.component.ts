import {Component, OnDestroy} from '@angular/core';
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnDestroy {

  surveyList: IProcess[] = []
  selectedSurvey: IProcess | null = null
  onDestroy$ = new Subject();
  displayList: IProcess[] = [];


  constructor(private processService: ProcessService) {
    this.processService.$surveyList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => {
        this.surveyList = list
        this.displayList = list
      }
    )
  }


  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

  onViewSurveyClick(survey: IProcess): void {
    this.selectedSurvey = survey
  }

  onDeleteSurveyClick(survey: IProcess): void {
    this.processService.deleteProcess(survey)
  }

  viewAllSurveysClick(): void {
    this.selectedSurvey = null
  }

  filterSurveys(filterText: any): void {
    this.displayList = [...this.surveyList]
    if (filterText.target.value === "" || filterText.target.value === null)
      return
    const regexp = new RegExp(filterText.target.value, 'i')
    this.displayList = this.displayList.filter(survey => regexp.test(survey.title))
  }

}
