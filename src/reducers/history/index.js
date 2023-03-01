import {GET_LIST_HISTORY, UPDATE_STATUS} from '../../actions/HistoryAction';

const initialState = {
  getListHistoryLoading: false,
  getListHistoryResult: false,
  getListHistoryError: false,

  updateStatusLoading: false,
  updateStatusResult: false,
  updateStatusError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_HISTORY:
      return {
        ...state,
        getListHistoryLoading: action.payload.loading,
        getListHistoryResult: action.payload.data,
        getListHistoryError: action.payload.errorMessage,
      };

    case UPDATE_STATUS:
      return {
        ...state,
        updateStatusLoading: action.payload.loading,
        updateStatusResult: action.payload.data,
        updateStatusError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
