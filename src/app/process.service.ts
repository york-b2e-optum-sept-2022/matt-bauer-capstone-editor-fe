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
  $httpErrorMessage = new BehaviorSubject<string | null>(null)

  constructor(private httpService: HttpService) {
    this.getAllProcesses()
  }

  createProcess(newProcessTitle: string) {
    this.httpService.createProcess(newProcessTitle).pipe(first()).subscribe({
        next: process => {
          let processList = [...this.$surveyList.getValue()]
          processList.push(process)
          this.$surveyList.next(processList)
        },
        error: err => {
          if(err.status === 409){
            this.$httpErrorMessage.next("Survey Title is not unique")
            return
          }
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
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
        this.$httpErrorMessage.next("An unknown error occurred, please try again later")
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
        if(err.status === 409){
          this.$httpErrorMessage.next("Survey Title is not unique")
          return
        }
        this.$httpErrorMessage.next("An unknown error occurred, please try again later")

      }
    }
  )
  }

  deleteProcess(process: IProcess) {
    this.httpService.deleteProcess(process.id).pipe(first()).subscribe({
        next: process => {
          this.getAllProcesses()
        },
        error: err => {
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }

}
