import {Component, Input, OnInit} from '@angular/core';
import {IFinishedProcess} from "../_Interfaces/IFinishedProcess";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit{

  @Input() response!: IFinishedProcess

  ngOnInit() {
    this.response.responseList.sort((a, b) => a.index - b.index)
  }

}
