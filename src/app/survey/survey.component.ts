import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";
import {IStage} from "../_Interfaces/IStage";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @Input() survey!: IProcess | null
  selectedSurvey!: IProcess
  surveyList: IProcess[] = []
  onDestroy$ = new Subject()
  isCreatingQuestion: boolean = false

  constructor(private processService: ProcessService) {
    this.processService.$surveyList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => {
        let selectedIndex = list.length - 1
        if (!this.survey)
          this.selectedSurvey = list[selectedIndex]
        else this.selectedSurvey = this.survey
        if(this.selectedSurvey.questionList)
        this.selectedSurvey.questionList.sort((a, b) => a.index - b.index)
      }
    )
  }

  ngOnInit(): void {
    if (this.survey)
      this.selectedSurvey = this.survey
  }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }


  addNewQuestionClick() {
    this.isCreatingQuestion = true
  }


  addQuestion(newQuestion: IStage) {
    if (!this.selectedSurvey.questionList)
      this.selectedSurvey.questionList = []
    if (this.selectedSurvey.questionList)
      newQuestion.index = this.selectedSurvey.questionList.length
    this.selectedSurvey.questionList.push(newQuestion)
    console.log(this.selectedSurvey)
    this.processService.updateProcess(this.selectedSurvey)
    this.isCreatingQuestion = false
  }
}
