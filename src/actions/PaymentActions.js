import axios from 'axios'
import { API_TIMEOUT, URL_MIDTRANS, HEADER_MIDTRANS } from '../utils/constant'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const SNAP_TRANSACTIONS = "SNAP_TRANSACTIONS"

export const snapTransactions = (data) => {
    return (dispatch) => {

        dispatchLoading(dispatch, SNAP_TRANSACTIONS);

        axios({
            method: "POST",
            url: URL_MIDTRANS + "transactions",
            headers: HEADER_MIDTRANS,
            data: data,
            timeout: API_TIMEOUT
        })
            .then(function (response) {

                dispatchSuccess(dispatch, SNAP_TRANSACTIONS, response.data);

            })
            .catch(function (error) {

                dispatchError(dispatch, SNAP_TRANSACTIONS, error)

                alert(error);

            })

    }
}