import { useRef, useContext } from 'react';
import { useHistory} from 'react-router-dom';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/Auth-Context';

const ProfileForm = () => {

  const history = useHistory();
  
  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  

  const submitHandler = (event) =>{
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyABV3Ka88_JCZGivdh4xR89-n-S_BkTf1I',{
      method: 'Post',
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnedSecuredToken: false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res) =>{
      history.replace('/');
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
