import {HttpError} from "./HttpError";

export interface Status {
  loading: boolean;
  error: HttpError;
}
