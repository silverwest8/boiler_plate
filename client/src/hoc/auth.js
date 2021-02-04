import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
/*
    export default function (Specification, option, adminRout = null) 
    에서 option => null(아무나 출입 가능), true(로그인유저만 출입 가능), false(로그인한 유저는 출입 불가)
    사용 : Auth( Page, null, true) 마지막true -> 어드민유저만 출입 가능
*/
    function AthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect( () => {

            dispatch(auth()) //action이름 : auth // Axios.get('api/user/auth');
                .then(response => {
                    console.log(response) //auth(HOC)를 만들고 각각의 컴포넌트(페이지) 를 넣어줘야 함 -> App.js에서!

                    if (!response.payload.isAuth) { //로그인하지 않은 상태
                        if (option) {
                            props.history.push('/loginPage')
                        }
                    } else { //로그인 한 상태
                        if (adminRoute && !response.payload.isAdmin) {
                            props.history.push('/');
                        } else {
                            if (option === false) {
                                props.history.push('/')
                            }
                        }

                    }
                })
        }, [])

        //페이지 이동시마다 dispatch 작동해서 백엔드에 request를 주고 response 받음
        return <SpecificComponent/>;
        // return <SpecificComponent{...props} /> -> 각 페이지 컴포넌트에 적용할 필요가 없음
    }

    return AthenticationCheck;
}