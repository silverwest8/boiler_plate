import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");


    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const dispatch = useDispatch();


    const onSubmitHandler = (event) => {
        event.preventDefault(); //리프레시 방지

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        } 
        let body = {
            name: Name,
            email: Email,
            password: Password
        }
        // console.log('Email', Email);
        // console.log('Password', Password);

        //서버로 보내기 위해 디스패치 -> Axios 사용 (Action)
        
        //만약 redux를 안썼다면?
        // Axios.post('/api/user/register', body);

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.registerSuccess) {
                props.history.push('/loginPage');
            } else {
                alert("Failed to sign up");
            }
        })
    }


    return (
        <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            
            {/* <h2>Register</h2> */}

            <form
                style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                onSubmit = {onSubmitHandler} >

                <label>Name</label>
                <input type='text' value={Name} onChange={onNameHandler}/>

                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>

                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>

                <label>Confirm Password</label>
                <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <button type='submit'> 회원가입 </button>
            </form>

        </div>
    )
}

// export default RegisterPage
export default withRouter(RegisterPage)