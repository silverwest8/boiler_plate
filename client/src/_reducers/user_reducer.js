import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types'
//다른 타입이 올때마다 다른 처리 --> 스위치

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload }
            break;
        case AUTH_USER:
            return {...state, userData: action.payload } //서버쪽에서 받아온 데이터가 다 들어있음
            break;
        default:
            return state;
    }
}