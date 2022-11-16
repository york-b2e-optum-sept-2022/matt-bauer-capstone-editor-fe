import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessService} from "../process.service";
import {IStage} from "../_Interfaces/IStage";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  @Output() onEditEvent = new EventEmitter<IStage | null>()
  @Input() questionToEdit!: IStage | null
  @Output() onCreateQuestion = new EventEmitter<IStage>()
  newQuestionPrompt: string | null = null
  newQuestionResponseType: string | null = null
  newQuestionResponseOptions: string[] = []
  multipleChoiceList: string[] = []
  blankFieldMessage: string | null = null

  constructor(private processService: ProcessService) {
  }

  ngOnInit(): void {
    if (this.questionToEdit) {
      this.newQuestionPrompt = this.questionToEdit.prompt
      this.newQuestionResponseType = this.questionToEdit.responseType
      this.newQuestionResponseOptions = this.questionToEdit.responseOptions
      if (this.newQuestionResponseType === "Multiple Choice") {
        for (let i = 0; i < this.newQuestionResponseOptions.length; i++) {
          this.multipleChoiceList.push(`Option ${i + 1}`)
        }
      } else this.multipleChoiceList = []
    }
  }

  onTypeSelection() {
    this.multipleChoiceList = []
    this.newQuestionResponseOptions = []
    if (this.newQuestionResponseType === "Multiple Choice")
      this.multipleChoiceList.push(`Option ${this.multipleChoiceList.length + 1}`)
    else this.multipleChoiceList = []
    console.log(this.newQuestionResponseType)
  }

  addOption(option: string) {
    this.blankFieldMessage = null
    if (!option) {
      this.blankFieldMessage = "Option cannot be empty"
      return
    }
    this.newQuestionResponseOptions.push(option)
    this.multipleChoiceList.push(`Option ${this.multipleChoiceList.length + 1}`)
  }

  removeOption(option: string) {
    let index = this.newQuestionResponseOptions.indexOf(option)
    this.newQuestionResponseOptions.splice(index, 1)
    this.multipleChoiceList.splice(index, 1)
  }

  onCreateQuestionClick() {
    this.blankFieldMessage = null
    if (!this.newQuestionPrompt) {
      this.blankFieldMessage = "Question prompt cannot be blank"
      return
    }
    if (!this.newQuestionResponseType) {
      this.blankFieldMessage = "Please select a response type"
      return
    }
    if (this.newQuestionResponseType === "Multiple Choice" && this.newQuestionResponseOptions.length === 0) {
      this.blankFieldMessage = "Multiple Choice option cannot be empty"
      return
    }
    if (this.newQuestionResponseType === "True/False") {
      this.newQuestionResponseOptions.push("True")
      this.newQuestionResponseOptions.push("False")
    }
    this.onCreateQuestion.emit({
      id: -1,
      index: 0,
      prompt: this.newQuestionPrompt,
      responseType: this.newQuestionResponseType,
      responseOptions: this.newQuestionResponseOptions,
    })
  }


  onEditSaveClick() {
    this.blankFieldMessage = null
    if (!this.newQuestionPrompt) {
      this.blankFieldMessage = "Question prompt cannot be blank"
      return
    }
    if (!this.newQuestionResponseType) {
      this.blankFieldMessage = "Please select a response type"
      return
    }
    if (this.newQuestionResponseType === "Multiple Choice" && this.newQuestionResponseOptions.length === 0) {
      this.blankFieldMessage = "Multiple Choice option cannot be empty"
      return
    }
    if (this.newQuestionResponseType === "True/False") {
      this.newQuestionResponseOptions.push("True")
      this.newQuestionResponseOptions.push("False")
    }
    if(this.questionToEdit) {
      this.questionToEdit.prompt = this.newQuestionPrompt
      this.questionToEdit.responseOptions = this.newQuestionResponseOptions
      this.questionToEdit.responseType = this.newQuestionResponseType
    }
    console.log("This is the question coming from event create: ", this.questionToEdit)
    this.onEditEvent.emit(this.questionToEdit)
  }

  onEditCancelClick() {
    this.onEditEvent.emit(null)
  }

  onCreateCancel() {
    this.onEditEvent.emit(null)
  }
}//end of class
