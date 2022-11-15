import {IStage} from "./IStage";

export interface IProcess {
  id: number
  title: string
  questionList: IStage[]
}
