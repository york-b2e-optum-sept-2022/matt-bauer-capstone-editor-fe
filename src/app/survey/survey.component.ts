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
  onDestroy$ = new Subject()
  isCreatingQuestion: boolean = false
  onEditTitle: string | null = null
  isEditingTitle: boolean = false

  constructor(private processService: ProcessService) {
    this.processService.$surveyList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => {
        let selectedIndex = list.length - 1
        if (!this.survey)
          this.selectedSurvey = list[selectedIndex]
        else this.selectedSurvey = this.survey
        if (this.selectedSurvey.questionList)
          this.selectedSurvey.questionList.sort((a, b) => a.index - b.index)
      }
    )

    this.processService.$httpErrorMessage.pipe(takeUntil(this.onDestroy$)).subscribe(
      message => {
        this.isEditingTitle = !!message
      }
    )
    this.isEditingTitle = false
  }

  ngOnInit(): void {
    if (this.survey) {
      this.selectedSurvey = this.survey
      this.selectedSurvey.questionList.sort((a, b) => a.index - b.index)
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

  addNewQuestionClick(): void {
    this.isCreatingQuestion = true
  }

  addQuestion(newQuestion: IStage): void {
    if (!this.selectedSurvey.questionList || this.selectedSurvey.questionList.length === 0)
      this.selectedSurvey.questionList = []
    if (this.selectedSurvey.questionList)
      newQuestion.index = this.selectedSurvey.questionList.length
    this.selectedSurvey.questionList.push(newQuestion)
    this.processService.updateProcess(this.selectedSurvey)
    this.isCreatingQuestion = false
  }

  onEditTitleClick(): void {
    this.onEditTitle = this.selectedSurvey.title
    this.isEditingTitle = true
  }

  onSaveTitleChanges(): void {
    this.processService.$httpErrorMessage.next(null)
    if (!this.onEditTitle)
      return
    if (!this.selectedSurvey.questionList)
      this.selectedSurvey.questionList = []
    let savedSurvey = {...this.selectedSurvey}
    savedSurvey.title = this.onEditTitle
    this.processService.updateProcess(savedSurvey)
    if(this.processService.$httpErrorMessage.getValue())
      this.onEditTitle = this.selectedSurvey.title
  }

  onCancelTitleChanges(): void {
    this.onEditTitle = null
    this.isEditingTitle = false
  }

  onCreateCancelClick(event: IStage | null): void {
    if (!event)
      this.isCreatingQuestion = false
  }
}
