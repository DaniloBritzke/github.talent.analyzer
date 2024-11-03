export interface ITaskCreate {
  url: string
  timestamp: number
}

export interface IError {
  message: string;
  code: number;
}

export interface ITask extends ITaskCreate {
  id: string
  done: boolean
  error?: IError;
}

export interface IQueueRepository {
  getNext(): Promise<ITask>
  create(task: ITaskCreate): Promise<ITask>
  onDone({ id, done, error }: Partial<ITask>): Promise<void>
}
