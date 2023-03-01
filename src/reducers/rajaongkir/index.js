import {
  GET_PROVINSI,
  GET_KOTA,
  GET_KOTA_DETAIL,
  POST_ONGKIR,
} from '../../actions/RajaOngkirAction';

const initialState = {
  getProvinsiLoading: false,
  getProvinsiResult: false,
  getProvinsiError: false,

  getKotaLoading: false,
  getKotaResult: false,
  getKotaError: false,

  getKotaDetailLoading: false,
  getKotaDetailResult: false,
  getKotaDetailError: false,

  ongkirLoading: false,
  ongkirResult: false,
  ongkirError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROVINSI:
      return {
        ...state,
        getProvinsiLoading: action.payload.loading,
        getProvinsiResult: action.payload.data,
        getProvinsiError: action.payload.errorMessage,
      };

    case GET_KOTA:
      return {
        ...state,
        getKotaLoading: action.payload.loading,
        getKotaResult: action.payload.data,
        getKotaError: action.payload.errorMessage,
      };

    case GET_KOTA_DETAIL:
      return {
        ...state,
        getKotaDetailLoading: action.payload.loading,
        getKotaDetailResult: action.payload.data,
        getKotaDetailError: action.payload.errorMessage,
      };

    case POST_ONGKIR:
      return {
        ...state,
        ongkirLoading: action.payload.loading,
        ongkirResult: action.payload.data,
        ongkirError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
