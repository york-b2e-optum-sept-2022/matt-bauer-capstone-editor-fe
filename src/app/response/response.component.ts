import {Component, Input, OnInit} from '@angular/core';
import {IResponse} from "../_Interfaces/IResponse";
import {IFinishedProcess} from "../_Interfaces/IFinishedProcess";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor() { }
  @Input() response!: IFinishedProcess

  ngOnInit(): void {
  }

}
