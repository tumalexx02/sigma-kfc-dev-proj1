import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import ProtectedInput from '../../components/ProtectedInput/ProtectedInput';
import styles from './Register.module.css';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../stores/user.store';
import { isNameValid, isPasswordValid, isEmailValid, arePasswordsSame } from '../../helpers/auth.validation';
import { AuthErrorMessage } from '../../components/AuthErrorMessage/AuthErrorMessage';

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
  const serverErrorMessage = useUserStore(state => state.serverErrorMessage);
  const serverErrorType = useUserStore(state => state.serverErrorType);
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
    setErrorMessage(serverErrorMessage);
  }, [serverErrorMessage])

  useEffect(() => {
    setErrorType(serverErrorType);
  }, [serverErrorType])

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
    clearServerError();
    setErrorType(null);
    setErrorMessage(null);
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

      {errorMessage && <AuthErrorMessage>{errorMessage}</AuthErrorMessage>}

      <form className={styles['form']} onSubmit={handleSubmit}>
        <Input label='Ваше имя' inputId='name' autoComplete='name' ref={nameRef} placeholder="Имя" type="text" name="name" isValid={(errorType !== 'all') && (errorType !== 'name')} onChange={() => clearError()} />

        <Input label='Ваш Email' inputId='email' autoComplete='email' ref={emailRef} placeholder="Email" type="text" name="email" isValid={(errorType !== 'all') && (errorType !== 'email')} onChange={() => clearError()} />

        <ProtectedInput label='Ваш пароль' inputId='password' autoComplete='new-password' ref={passwordRef} placeholder="Пароль" name="password" isValid={(errorType !== 'all') && (errorType !== 'password')} onChange={() => clearError()} />

        <ProtectedInput label='Ваш пароль (подтверждение)' inputId='repeatPassword' autoComplete='new-password' ref={repeatPasswordRef} placeholder="Повторите пароль" name="repeatPassword" isValid={(errorType !== 'all') && (errorType !== 'repeat-password')} onChange={() => clearError()} />

        <Button className={styles['button']} size='big' onMouseDown={e => e.preventDefault()}>Создать аккаунт</Button>
      </form>

      <div className={styles['more-wrapper']}>
        <span>Уже есть аккаунт?</span>
        <Link className={styles['link']} to='/auth/login'>Войти</Link>
      </div>
    </div>
  )
}