import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {IProcess} from "./_Interfaces/IProcess";
import {BehaviorSubject, first} from "rxjs";
import {IStage} from "./_Interfaces/IStage";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $surveyList = new BehaviorSubject<IProcess[]>([])
  $newQuestion = new BehaviorSubject<IStage | null>(null)

  constructor(private httpService: HttpService) {
    this.getAllProcesses()
  }

  createProcess(newProcessTitle: string) {
    this.httpService.createProcess(newProcessTitle).pipe(first()).subscribe({
        next: process => {
          console.log("new survey: ", process)
          let processList = [...this.$surveyList.getValue()]
          processList.push(process)
          this.$surveyList.next(processList)
          console.log("from create method", this.$surveyList.getValue())
        },
        error: err => {
        }
      }
    )
  }

  getAllProcesses() {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
      next: list => {
        this.$surveyList.next(list)
      },
      error: err => {
      }
    }
    )
  }

  updateProcess(process: IProcess) {
  this.httpService.updateProcess(process).pipe(first()).subscribe({
      next: process => {
        this.getAllProcesses()
      },
      error: err => {
      }
    }
  )
  }

}
