import { GET_USER } from '../../actions/UserAction'

const initialState = {
    dataUser: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                dataUser: action.payload
            }
        default:
            return state
    }
}

