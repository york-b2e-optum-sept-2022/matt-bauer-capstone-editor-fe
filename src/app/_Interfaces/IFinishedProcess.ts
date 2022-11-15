import {IResponse} from "./IResponse";

export interface IFinishedProcess{
  id: number
  surveyTitle: string
  dateFinished: Date
  responseList: IResponse[]
}
