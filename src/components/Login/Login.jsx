import './Login.css'; 

const Login = () => {
    return (
        <form action="" className="formLoginUser" >
            <input type="text" placeholder="UserName" id='usernameLogin' required />
            <input type="password" placeholder="Password" id='passwordLogin' required autoComplete='off'/>
        </form>
    );
}

export default Login ; 