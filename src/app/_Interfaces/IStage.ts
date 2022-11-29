import {RESPONSE_TYPE} from "../process.service";

export interface IStage{
  id: number
  index: number
  prompt: string
  responseType: RESPONSE_TYPE
  responseOptions: string[]
}
