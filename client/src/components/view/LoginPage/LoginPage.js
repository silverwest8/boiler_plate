import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux'
//dispatch를 이용해 액션을 짜고 -> 리듀서
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {

    //state 사용(자주 바뀌는 값)
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const dispatch = useDispatch();

    const onSubmitHandler = (event) => {
        event.preventDefault(); //리프레시 방지
        let body = {
            email: Email,
            password: Password
        }
        // console.log('Email', Email);
        // console.log('Password', Password);

        //서버로 보내기 위해 디스패치 -> Axios 사용 (Action)
        
        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/');
            } else {
                alert("Error");
            }
        })
    }

    return (
        <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            
            {/* <h2>Login</h2> */}

            <form
                style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                onSubmit = {onSubmitHandler} >

                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>

                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>

                <button type='submit'> Login </button>
            </form>

        </div>
    )
}

export default withRouter(LoginPage)