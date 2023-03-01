import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const UPDATE_PESANAN = "UPDATE_PESANAN";

export const updatePesanan = (params) => {
    return (dispatch) => {

        dispatchLoading(dispatch, UPDATE_PESANAN);

        //GET UID USER
        const uid = params.order_id.split("-")[2];

        //GET KERANJANG BY UID USER
        FIREBASE.database()
            .ref("keranjangs/"+uid)
            .once("value", (querySnapshot) => {

                if(querySnapshot.val()) {

                    //ambil data keranjang
                    const data = querySnapshot.val();

                    //duplikasi & modifikasi data keranjang
                    const dataBaru = {...data}
                    dataBaru.ongkir = params.ongkir;
                    dataBaru.estimasi = params.estimasi;
                    dataBaru.url = params.url;
                    dataBaru.order_id = params.order_id;
                    dataBaru.status = "pending";

                    //delete data keranjang
                    FIREBASE.database()
                        .ref('keranjangs/'+uid)
                        .remove()
                        .then(() => {

                            //add new data history
                            FIREBASE.database()
                                .ref("histories")
                                .child(params.order_id)
                                .set(dataBaru)
                                .then((response) => {

                                    dispatchSuccess(dispatch, UPDATE_PESANAN, response ? response : [])

                                })
                                .catch((error) => {

                                    dispatchError(dispatch, UPDATE_PESANAN, error)
                                    alert(error);
                                })


                        })
                        .catch((error) => {

                            dispatchError(dispatch, UPDATE_PESANAN, error)
                            alert(error);
                        })

                }

            })
            .catch((error) => {

                dispatchError(dispatch, UPDATE_PESANAN, error)
                alert(error);
            })


    }
}