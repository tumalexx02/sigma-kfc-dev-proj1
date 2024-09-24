import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import ProtectedInput from '../../components/ProtectedInput/ProtectedInput';
import styles from './Register.module.css';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../stores/user.store';
import { isNameValid, isPasswordValid, isEmailValid, arePasswordsSame } from '../../helpers/auth.validation';

export type RegisterErrorTypes = 'name' | 'email' | 'password' | 'repeat-password' | 'all' | null;

export type LoginForm = {
  name: {
    value: string;
  },
  email: {
    value: string;
  };
  password: {
    value: string;
  },
  repeatPassword: {
    value: string;
  },
}

export function Register() {
  const [errorType, setErrorType] = useState<RegisterErrorTypes>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const jwt = useUserStore(state => state.jwt);
  const serverError = useUserStore(state => state.serverError);
  const register = useUserStore(state => state.register);
  const clearServerError = useUserStore(state => state.clearServerError);
  
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

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
      setErrorType('email');
    }
  }, [serverError])

  useEffect(() => {
    switch(errorType) {
      case 'name':
        nameRef.current?.focus();
        break;
      case 'email':
        emailRef.current?.focus();
        break;
      case 'password':
        passwordRef.current?.focus();
        break;
      case 'repeat-password':
        repeatPasswordRef.current?.focus();
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
    
    const name = target.name.value.trim();
    const email = target.email.value.trim();
    const password = target.password.value.trim();
    const repeatPassword = target.repeatPassword.value.trim();

    if (!isNameValid(name)) {
      setErrorType('name');
      setErrorMessage('Имя должно быть не короче 2 символов');
      return;
    }

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

    if (!arePasswordsSame(password, repeatPassword)) {
      setErrorType('repeat-password');
      setErrorMessage('Пароли должны совпадать');
      return;
    }

    clearError();
    register(name, email, password);
  }

  return (
    <div className={styles['form-wrapper']}>
      <Headling>Регистрация</Headling>

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
          <label className={styles['label']} htmlFor="name">Ваше имя</label>
          <Input autoComplete='name' ref={nameRef} placeholder="Имя" id="name" type="text" name="name" isValid={(errorType !== 'all') && (errorType !== 'name')} onChange={() => clearError()} />
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="email">Ваш Email</label>
          <Input autoComplete='email' ref={emailRef} placeholder="Email" id="email" type="text" name="email" isValid={(errorType !== 'all') && (errorType !== 'email')} onChange={() => clearError()} />
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="password">Ваш пароль</label>
          <ProtectedInput autoComplete='new-password' ref={passwordRef} placeholder="Пароль" id="password" name="password" isValid={(errorType !== 'all') && (errorType !== 'password')} onChange={() => clearError()} />
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="repeatPasswordRef">Повторите пароль</label>
          <ProtectedInput autoComplete='new-password' ref={repeatPasswordRef} placeholder="Ваш пароль (повтор)" id="repeatPassword" name="repeatPassword" isValid={(errorType !== 'all') && (errorType !== 'repeat-password')} onChange={() => clearError()} />
        </div>
        <Button className={styles['button']} size='big' onMouseDown={e => e.preventDefault()}>Создать аккаунт</Button>
      </form>

      <div className={styles['more-wrapper']}>
        <span>Уже есть аккаунт?</span>
        <Link className={styles['link']} to='/auth/login'>Войти</Link>
      </div>
    </div>
  )
}