import {UPDATE_PESANAN} from '../../actions/PesananAction';

const initialState = {
  updatePesananLoading: false,
  updatePesananResult: false,
  updatePesananError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PESANAN:
      return {
        ...state,
        updatePesananLoading: action.payload.loading,
        updatePesananResult: action.payload.data,
        updatePesananError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
