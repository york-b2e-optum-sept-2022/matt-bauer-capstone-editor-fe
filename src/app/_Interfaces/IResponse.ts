import {RESPONSE_TYPE} from "../process.service";

export interface IResponse{
  id: number
  index: number
  prompt: string
  response: string
  responseType: RESPONSE_TYPE
}
