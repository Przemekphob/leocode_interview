import { Epic, ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import {
  catchError, delay, map, switchMap,
} from "rxjs/operators";
import { getUniversitiesService } from "../../../services/Universities";
import {
  getUniversitiesError, GetUniversitiesRequestAction, getUniversitiesResponse,
} from "../../actions";
import { GetUniversitiesActionTypesEnum } from "../../actionTypes";

export const getUniversitiesEpic: Epic = ( action$: Observable<GetUniversitiesRequestAction> ) => action$.pipe(
  ofType( GetUniversitiesActionTypesEnum.GET_UNIVERSITIES_ACTION_REQUEST ),
  switchMap( ( action ) => from( getUniversitiesService( action.payload ) ).pipe(
    delay( 400 ),
    map( ( response ) => getUniversitiesResponse( response ) ),
    catchError( ( ) => of( getUniversitiesError( ) ) ),
  ) ),
);
