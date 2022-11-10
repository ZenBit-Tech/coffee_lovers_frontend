import { GoogleLogin } from '@react-oauth/google';
import { useAddUserGoogleMutation } from '@redux-freelance/services/authApi';
import { useNavigate } from 'react-router-dom';
import { ButtonContainer } from './styles';

export function GoogleLoginButton() {
  const [addUser] = useAddUserGoogleMutation();
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const response = await addUser(credentialResponse);
          navigate('/');
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </ButtonContainer>
  );
}
export default GoogleLoginButton;
