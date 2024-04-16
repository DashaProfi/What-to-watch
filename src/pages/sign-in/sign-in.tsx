import { FormEvent, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppDispatch, AppState } from '../../types/store';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/user-slice';
import { useSelector } from 'react-redux';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import { Navigate } from 'react-router-dom';
import ErrorPasswordMessage from '../../components/error-password-message/error-password-message';
const regExp = /((?=.*[a-zа-яA-ZА-Я])(?=.*\d))/;

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!regExp.test(password)) {
      setError('Пароль должен состоять минимум из одной буквы и цифры');
    } else {
      setError('');
      dispatch(setUserLogin({ email, password }));
    }
  };
  return (
    <div className='user-page'>
      <Header />
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <Navigate to={AppRoutes.Main} />
      ) : (
        <div className='sign-in user-page__content'>
          <form onSubmit={handleSubmit} action='#' className='sign-in__form'>
            <div className='sign-in__fields'>
              <div className='sign-in__field'>
                <input
                  className='sign-in__input'
                  type='email'
                  placeholder='Email address'
                  name='user-email'
                  id='user-email'
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
                <label
                  className='sign-in__label visually-hidden'
                  htmlFor='user-email'
                >
                  Email address
                </label>
              </div>
              <div className='sign-in__field'>
                <input
                  className='sign-in__input'
                  type='password'
                  placeholder='Password'
                  name='user-password'
                  id='user-password'
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
                <label
                  className='sign-in__label visually-hidden'
                  htmlFor='user-password'
                >
                  Password
                </label>
                <ErrorPasswordMessage error={error} />
              </div>
            </div>
            <div className='sign-in__submit'>
              <button className='sign-in__btn' type='submit'>
                Sign in
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default SignIn;
