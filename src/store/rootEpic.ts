import { combineEpics } from "redux-observable";
import { getUniversitiesEpic } from "./epics";

export default combineEpics(
  getUniversitiesEpic,
);
