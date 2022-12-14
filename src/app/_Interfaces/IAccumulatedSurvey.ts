import {RESPONSE_TYPE} from "../process.service";

export interface IAccumulatedSurvey {
  title: string
  numberOfResponses: number
  question: {
    prompt: string
    responseType: RESPONSE_TYPE
    index: number
    responses: {
      response: string
      percent?: number
    }[]
  }[]

}
