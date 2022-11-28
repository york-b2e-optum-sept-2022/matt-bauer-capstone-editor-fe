import {Injectable} from '@angular/core';
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";
import {IFinishedProcess} from "./_Interfaces/IFinishedProcess";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  $responseList = new BehaviorSubject<IFinishedProcess[]>([])
  $httpErrorMessage = new BehaviorSubject<string | null>(null)

  constructor(private httpService: HttpService) {
    this.getAllResponses()
  }

  getAllResponses() {
    this.httpService.getAllResponses().pipe(first()).subscribe({
        next: list => {
          this.$responseList.next(list)
        },
        error: () => {
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }
}
