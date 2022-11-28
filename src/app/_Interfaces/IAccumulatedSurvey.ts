export interface IAccumulatedSurvey {
  title: string
  numberOfResponses: number
  question: {
    prompt: string
    responseType: string
    responses: {
      response: string
      percent?: number
    }[]
  }[]

}
