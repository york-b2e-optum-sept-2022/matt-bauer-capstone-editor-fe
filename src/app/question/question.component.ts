import {Component, Input} from '@angular/core';
import {IStage} from "../_Interfaces/IStage";
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input() question!: IStage
  @Input() survey!: IProcess
  onEditQuestion: IStage | null = null

  constructor(private processService: ProcessService) {
  }

  onEditClick(): void {
    this.onEditQuestion = {...this.question}
  }

  onDeleteClick(): void {
    this.survey.questionList.splice(this.question.index, 1)
    for (let i = 0; i < this.survey.questionList.length; i++)
      this.survey.questionList[i].index = i
    this.processService.updateProcess(this.survey)
  }

  onUpClick(): void {
    let indexRight = this.question.index
    let indexLeft = indexRight - 1
    this.survey.questionList[indexRight].index = indexLeft
    this.survey.questionList[indexLeft].index = indexRight
    this.processService.updateProcess(this.survey)
  }

  onDownClick(): void {
    let indexLeft = this.question.index
    let indexRight = indexLeft + 1
    this.survey.questionList[indexLeft].index = indexRight
    this.survey.questionList[indexRight].index = indexLeft
    this.processService.updateProcess(this.survey)
  }

  onEditQuestionEvent(event: IStage | null): void {
    if (!event)
      this.onEditQuestion = null
    if (event) {
      let index = this.survey.questionList.findIndex(question => question.id === event.id)
      this.survey.questionList[index] = event
      this.processService.updateProcess(this.survey)
      this.onEditQuestion = null
    }
  }
}
