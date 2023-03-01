import {GET_LIST_LIGA, GET_DETAIL_LIGA} from '../../actions/LigaAction';

const initialState = {
  getListLigaLoading: false,
  getListLigaResult: false,
  getListLigaError: false,

  getDetailLigaLoading: false,
  getDetailLigaResult: false,
  getDetailLigaError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_LIGA:
      return {
        ...state,
        getListLigaLoading: action.payload.loading,
        getListLigaResult: action.payload.data,
        getListLigaError: action.payload.errorMessage,
      };

    case GET_DETAIL_LIGA:
      return {
        ...state,
        getDetailLigaLoading: action.payload.loading,
        getDetailLigaResult: action.payload.data,
        getDetailLigaError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
