import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRout = null) {

    function AthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect( () => {

            dispatch(auth()) //action이름 : auth // Axios.get('api/user/auth');
                .then(response => {
                    console.log(response) //auth(HOC)를 만들고 각각의 컴포넌트(페이지) 를 넣어줘야 함 -> App.js에서!
                })
        }, [])

        //페이지 이동시마다 dispatch 작동해서 백엔드에 request를 주고 response 받음
        return <SpecificComponent/>;
        // return <SpecificComponent{...props} /> -> 각 페이지 컴포넌트에 적용할 필요가 없음
    }

    return AthenticationCheck;
}