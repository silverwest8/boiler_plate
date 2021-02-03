import Axios from 'axios';

export function loginUser(dataToSubmit) {
    const request = Axios.post('/api/user/login', dataToSubmit) //서버에 request 날리기
        .then(response => response.data )    //서버에서 받은 data를 request에 저장
        //리
    return { //reques를 reducer 로 보내기 (이전스테이트 + 액션 => 다음스테이트)
        type: "LOGIN_USER",
        payload: request
    }
}