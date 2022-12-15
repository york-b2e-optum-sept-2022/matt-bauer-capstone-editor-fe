import { Component } from '@angular/core';
import {ProcessService} from "./process.service";
import {ResponseService} from "./response.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matt-bauer-capstone-editor-fe';
  viewOption: number | null = null
  httpErrorMessage: string | null = null

  constructor(private processService: ProcessService, private responseService: ResponseService) {
    this.processService.$httpErrorMessage.subscribe(
      message => this.httpErrorMessage = message
    )
    this.responseService.$httpErrorMessage.subscribe(
      message => this.httpErrorMessage = message
    )
  }

  viewOptionClick(option: number): void {
    this.viewOption = option
  }

  viewAllOptionsClick(): void {
    this.viewOption = null
  }
}
