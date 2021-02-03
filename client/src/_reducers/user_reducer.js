import {
    LOGIN_USER
} from '../_actions/types'
//다른 타입이 올때마다 다른 처리 --> 스위치

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
        default:
            return state;
    }
}