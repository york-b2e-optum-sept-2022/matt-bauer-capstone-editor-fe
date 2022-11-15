import {Component, Input, OnInit} from '@angular/core';
import {IStage} from "../_Interfaces/IStage";
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question!: IStage
  @Input() survey!: IProcess

  constructor(private processService: ProcessService) {
  }

  ngOnInit(): void {
  }

  onEditClick() {

  }

  onDeleteClick() {
this.survey.questionList.splice(this.question.index, 1)
    for(let i = 0; i < this.survey.questionList.length; i++)
      this.survey.questionList[i].index = i
    this.processService.updateProcess(this.survey)
    console.log(this.survey)
  }

  onUpClick() {
    console.log(this.survey)
    let indexRight = this.question.index
    let indexLeft = indexRight - 1
    this.survey.questionList[indexRight].index = indexLeft
    this.survey.questionList[indexLeft].index = indexRight
    this.processService.updateProcess(this.survey)
  }

  onDownClick() {
    let indexLeft = this.question.index
    let indexRight = indexLeft + 1
    this.survey.questionList[indexLeft].index = indexRight
    this.survey.questionList[indexRight].index = indexLeft
    this.processService.updateProcess(this.survey)
  }
}
