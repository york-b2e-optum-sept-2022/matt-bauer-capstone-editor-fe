import {Component, OnInit} from '@angular/core';
import {ProcessService} from "../process.service";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  surveyTitle: string | null = null
  //TODO surveytitle hardcoded for app build
  surveyCreated: boolean = false
  blankTitleMessage: string | null = null

  constructor(private processService: ProcessService) {

  }

  ngOnInit(): void {
  }

  onSurveyCreateClick() {
    if(!this.surveyTitle) {
      this.blankTitleMessage = "Title cannot be empty"
      return
    }
    this.surveyCreated = true
    this.processService.createProcess(this.surveyTitle)
  }

}
