import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {IProcess} from "./_Interfaces/IProcess";
import {BehaviorSubject, first} from "rxjs";


export enum RESPONSE_TYPE {
  "TEXT" = "TEXT",
  "TRUE_OR_FALSE" = "TRUE/FALSE",
  "MULTIPLE_CHOICE" = "MULTIPLE CHOICE"
}

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $surveyList = new BehaviorSubject<IProcess[]>([])
  $httpErrorMessage = new BehaviorSubject<string | null>(null)

  constructor(private httpService: HttpService) {
    this.getAllProcesses()
  }

  createProcess(newProcessTitle: string): void {
    this.httpService.createProcess(newProcessTitle).pipe(first()).subscribe({
        next: process => {
          let processList = [...this.$surveyList.getValue()]
          processList.push(process)
          this.$surveyList.next(processList)
          this.$httpErrorMessage.next(null)
        },
        error: err => {
          if (err.status === 409) {
            this.$httpErrorMessage.next("Survey Title is not unique")
            return
          }
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }

  getAllProcesses(): void {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
        next: list => {
          this.$surveyList.next(list)
        },
        error: () => {
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }

  updateProcess(process: IProcess): void {
    this.httpService.updateProcess(process).pipe(first()).subscribe({
        next: process => {
          let processList = [...this.$surveyList.getValue()]
          let index = processList.findIndex(p => process.id === p.id)
          processList.splice(index, 1, process)
          this.$surveyList.next(processList)
          this.$httpErrorMessage.next(null)
        },
        error: err => {
          if (err.status === 409) {
            this.$httpErrorMessage.next("Survey Title is not unique")
            return
          }
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")

        }
      }
    )
  }

  deleteProcess(process: IProcess): void {
    this.httpService.deleteProcess(process.id).pipe(first()).subscribe({
      next: () => {
        let processList = [...this.$surveyList.getValue()]
        let index = processList.findIndex(p => process.id === p.id)
        processList.splice(index, 1)
        this.$surveyList.next(processList)
        },
        error: () => {
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }

}
