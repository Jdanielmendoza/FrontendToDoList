
import './Register.css'; 

const Register = () => {
    return (
        <form action="" className="formRegisterUser">
            <input type="text" placeholder="UserName" id='usernameRegister'/>
            <select className='selectSexo'  id="selectSexo" >
                <option value="M" selected>Masculino</option>
                <option value="F">Femenido</option>
            </select>
            <input type="password" placeholder="Password" id='passwordRegister'/>
            <input type="password" placeholder='Repeat Password' id='passwordRepeat'/>
        </form>
    );
}

export default Register ; 