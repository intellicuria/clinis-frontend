import { combineReducers, configureStore } from '@reduxjs/toolkit';
import visit, { ModuleState } from './currentModule';
import click, { ClickState } from './clickModule';
import visitData, { VisitDataState } from './getVisits';
import currentVisit, { visitState } from './currentVisit';

const reducer = combineReducers({
    visit,
    click,
    visitData,
    currentVisit,
});

export * from './currentModule'
export * from './clickModule'
export * from './getVisits'
export * from './currentVisit'
export type VisitState = {
    visit: ModuleState;
    click: ClickState;
    visitData: VisitDataState;
    // currentCase: CaseState;
    currentVisit: visitState;
   
}

export default reducer
