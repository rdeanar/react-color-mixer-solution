import { all, takeEvery, put, delay } from "redux-saga/effects";

import { serverAddColor, serverLoadColors } from "./server";

export function* rootSaga() {
  yield all([loadColorsLoop(), watchAddColor()]);
}

function* loadColorsLoop() {
  while (true) {
    try {
      yield put({ type: "LOAD_COLORS" });
      const result = yield serverLoadColors();
      yield put({
        type: "COLORS_LOADED",
        colors: result
      });
      yield delay(10000);
    } catch (err) {
      console.log("Server responded with error " + err);
    }
  }
}

function* watchAddColor() {
  yield takeEvery("INIT_ADD_COLOR", addColor);
}

function* addColor(action) {
  // Try to save color until server responds with OK
  while (true) {
    try {
      const response = yield serverAddColor(action.color);
      yield put({type: 'ADD_COLOR', color: {...action.color, id: response}});
      break;
    } catch (err) {
      console.log("Add color: Server responded with error " + err);
    }
  }
}
