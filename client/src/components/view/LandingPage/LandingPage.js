import React, {useEffect} from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    useEffect(() => {
        Axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onLogoutHandler = () => {
        Axios.get('/api/user/logout')
            .then(response => {
                if (response.data.logoutSuccess) {
                    props.history.push('/loginPage')
                } else {
                    alert("Failed to logout")
                }
                // console.log(response.data)
            })
    }

    return (
        <div style = {{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <h2>시작페이지</h2>
            <button onClick={onLogoutHandler}>로그아웃</button>
        </div>
    )
}

// export default LandingPage
export default withRouter(LandingPage)