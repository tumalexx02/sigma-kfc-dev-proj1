import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import ProtectedInput from '../../components/ProtectedInput/ProtectedInput';
import styles from './Login.module.css';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { isEmailValid, isPasswordValid } from '../../helpers/auth.validation';
import { useUserStore } from '../../stores/user.store';

export type LoginErrorTypes = 'email' | 'password' | 'all' | null;

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  }
}

export function Login() {
  const [errorType, setErrorType] = useState<LoginErrorTypes>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const jwt = useUserStore(state => state.jwt);
  const serverError = useUserStore(state => state.serverError);
  const login = useUserStore(state => state.login);
  const clearServerError = useUserStore(state => state.clearServerError);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(clearError, [clearServerError]);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  useEffect(() => {
    if (serverError) {
      setErrorMessage(serverError);
      setErrorType('all');
    }
  }, [serverError])

  useEffect(() => {
    switch(errorType) {
      case 'email':
        emailRef.current?.focus();
        break;
      case 'password':
        passwordRef.current?.focus();
        break;
      case 'all':
        emailRef.current?.focus();
        break;
    }
  }, [errorType])

  function clearError() {
    setErrorType(null);
    setErrorMessage(null);
    clearServerError();
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & LoginForm;
    const email = target.email.value.trim();
    const password = target.password.value.trim();

    if (!isEmailValid(email)) {
      setErrorType('email');
      setErrorMessage('Введите корректный Email');
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorType('password');
      setErrorMessage('Пароль должен быть не короче 8 символов');
      return;
    }

    clearError();
    login(email, password);
  }

  return (
    <div className={styles['form-wrapper']}>
      <Headling>Вход</Headling>

      {errorMessage && 
      (<div className={styles['error-message']}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="var(--background-color)"><path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z"/></svg>
        </div>
        <span>{errorMessage}</span>
      </div>)
      }

      <form className={styles['form']} onSubmit={handleSubmit}>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="email">Ваш Email</label>
          <Input ref={emailRef} placeholder="Email" id="email" type="text" name="email" isValid={(errorType !== 'all') && (errorType !== 'email')} onChange={() => clearError()} />
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="password">Ваш пароль</label>
          <ProtectedInput ref={passwordRef} placeholder="Пароль" id="password" name="password" isValid={(errorType !== 'all') && (errorType !== 'password')} onChange={() => clearError()} />
        </div>
        <Button className={styles['button']} size='big' onMouseDown={e => e.preventDefault()}>Войти</Button>
      </form>

      <div className={styles['more-wrapper']}>
        <span>Ещё нет аккаунта?</span>
        <Link className={styles['link']} to='/auth/register'>Зарегистрироваться</Link>
      </div>
    </div>
  )
}