import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types'
//다른 타입이 올때마다 다른 처리 --> 스위치

function User_reducer (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload } //서버쪽에서 받아온 데이터가 다 들어있음
        default:
            return state;
    }
}

export default User_reducer;