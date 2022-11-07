import { StyledGoogleLoginButton } from './styles';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router';
const firebaseConfig = {
  apiKey: 'AIzaSyCVzCh7H0Rwisy7i9qkr55b9DdrlCFVbfg',
  authDomain: 'zinc-direction-359814.firebaseapp.com',
  projectId: 'zinc-direction-359814',
  storageBucket: 'zinc-direction-359814.appspot.com',
  messagingSenderId: '71848933982',
  appId: '1:71848933982:web:d941b0285e053095cf52cf',
  measurementId: 'G-NJSTXXSMD0',
};
//1:71848933982:web:d941b0285e053095cf52cf

export function GoogleLoginButton() {
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const providerGoogle = new GoogleAuthProvider();

  const signInWihGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((results) => {
        console.log(results.user);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledGoogleLoginButton
      onClick={() => {
        signInWihGoogle();
      }}
    >
      {' '}
      Log in
    </StyledGoogleLoginButton>
  );
}

//643525001877-2fkl5dgip9hql6cul5purf0pilkcmn2b.apps.googleusercontent.com id
//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 selector
//https://zinc-direction-359814.firebaseapp.com/__/auth/handler

export default GoogleLoginButton;
