import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStage} from "../_Interfaces/IStage";
import {RESPONSE_TYPE} from "../process.service";

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
  newQuestionResponseType: RESPONSE_TYPE | null = null
  newQuestionResponseOptions: string[] = []
  blankFieldMessage: string | null = null
  newQuestionMCOption: string | null = null
  optionToEdit: string | null = null
  responseType!: RESPONSE_TYPE

  ngOnInit(): void {
    if (this.questionToEdit) {
      this.newQuestionPrompt = this.questionToEdit.prompt
      this.newQuestionResponseType = this.questionToEdit.responseType
      this.newQuestionResponseOptions = this.questionToEdit.responseOptions
      if (this.newQuestionResponseType === RESPONSE_TYPE.TRUE_OR_FALSE)
        this.newQuestionResponseOptions = []
    }
  }

  addOption() {
    this.blankFieldMessage = null
    if (!this.newQuestionMCOption) {
      this.blankFieldMessage = "Option cannot be empty"
      return
    }
    this.newQuestionResponseOptions.push(this.newQuestionMCOption)
    this.newQuestionMCOption = null
  }

  removeOption(option: string) {
    let index = this.newQuestionResponseOptions.indexOf(option)
    this.newQuestionResponseOptions.splice(index, 1)
  }

  dataValidation() {
    this.blankFieldMessage = null
    if (!this.newQuestionPrompt) {
      this.blankFieldMessage = "Question prompt cannot be blank"
      return false
    }
    if (!this.newQuestionResponseType) {
      this.blankFieldMessage = "Please select a response type"
      return false
    }
    if (this.newQuestionResponseType === RESPONSE_TYPE.MULTIPLE_CHOICE && this.newQuestionResponseOptions.length === 0) {
      this.blankFieldMessage = "Multiple Choice option cannot be empty"
      return false
    }
    if (this.newQuestionResponseType !== RESPONSE_TYPE.MULTIPLE_CHOICE)
      this.newQuestionResponseOptions = []
    if (this.newQuestionResponseType === RESPONSE_TYPE.TRUE_OR_FALSE) {
      this.newQuestionResponseOptions.push("True")
      this.newQuestionResponseOptions.push("False")
    }
    return true
  }

  onCreateQuestionClick() {
    if (!this.dataValidation())
      return
    if (this.newQuestionPrompt && this.newQuestionResponseType)
      this.onCreateQuestion.emit({
        id: -1,
        index: 0,
        prompt: this.newQuestionPrompt,
        responseType: this.newQuestionResponseType,
        responseOptions: this.newQuestionResponseOptions,
      })
  }

  onEditSaveClick() {
    if (!this.dataValidation())
      return
    if (this.newQuestionPrompt && this.newQuestionResponseType)
      if (this.questionToEdit) {
        this.questionToEdit.prompt = this.newQuestionPrompt
        this.questionToEdit.responseOptions = this.newQuestionResponseOptions
        this.questionToEdit.responseType = this.newQuestionResponseType
      }
    this.onEditEvent.emit(this.questionToEdit)
  }

  onEditCancelClick() {
    this.onEditEvent.emit(null)
  }

  onCreateCancel() {
    this.onEditEvent.emit(null)
  }

  onEditOptionClick(option: string) {
    this.optionToEdit = option
    this.newQuestionMCOption = option
  }

  cancelOptionEditClick() {
    this.optionToEdit = null
    this.newQuestionMCOption = null
  }

  onSaveOptionClick(option: string) {
    let index = this.newQuestionResponseOptions.findIndex(item => item === option)
    if (index !== -1) {
      if (this.newQuestionMCOption)
        this.newQuestionResponseOptions[index] = this.newQuestionMCOption
      this.newQuestionMCOption = null
      this.optionToEdit = null
    }
  }
}
