import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matt-bauer-capstone-editor-fe';
  viewOption: number | null = null

  viewOptionClick(option: number) {
    this.viewOption = option
  }

  viewAllOptionsClick() {
    this.viewOption = null
  }
}
