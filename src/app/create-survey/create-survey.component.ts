import {Component, OnDestroy} from '@angular/core';
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnDestroy {
  surveyTitle: string | null = null
  surveyCreated: boolean = false
  blankTitleMessage: string | null = null
  private onDestroy$ = new Subject()

  constructor(private processService: ProcessService) {
    this.processService.$httpErrorMessage.pipe(takeUntil(this.onDestroy$)).subscribe(
      message => {
        if (this.surveyCreated)
          return
        this.surveyCreated = !message
      }
    )
    this.surveyCreated = false
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

  onSurveyCreateClick() {
    if (!this.surveyTitle) {
      this.blankTitleMessage = "Title cannot be empty"
      return
    }
    this.processService.createProcess(this.surveyTitle)
  }

}
