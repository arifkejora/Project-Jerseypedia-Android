import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_JERSEY = 'GET_LIST_JERSEY';
export const GET_LIST_JERSEY_BY_LIGA = 'GET_LIST_JERSEY_BY_LIGA';
export const DELETE_PARAMETER_JERSEY = 'DELETE_PARAMETER_JERSEY';
export const SAVE_KEYWORD_JERSEY = "SAVE_KEYWORD_JERSEY";

export const getListJersey = (idLiga, keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JERSEY);

    if(idLiga) {  
      FIREBASE.database()
      .ref('jerseys')
      .orderByChild('liga')
      .equalTo(idLiga)
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JERSEY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });
    }else if (keyword) {
      
      FIREBASE.database()
      .ref('jerseys')
      .orderByChild('klub')
      .equalTo(keyword.toUpperCase())
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JERSEY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });

    } else {
      FIREBASE.database()
      .ref('jerseys')
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JERSEY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });
    }

   
  };
};

export const limitJersey = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JERSEY);

    FIREBASE.database()
      .ref('jerseys')
      .limitToLast(6)
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JERSEY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });
  };
};

export const getJerseyByLiga = (id, namaLiga) => ({
  type: GET_LIST_JERSEY_BY_LIGA,
  payload: {
    idLiga: id,
    namaLiga: namaLiga
  }
})

export const deleteParameterJersey = () => ({
  type: DELETE_PARAMETER_JERSEY,
})

export const saveKeywordJersey = (search) => ({
    type: SAVE_KEYWORD_JERSEY,
    payload: {
      data: search
    }
})
