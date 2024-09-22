export function isEmailValid(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email);
}

export function isPasswordValid(password: string) {
  return password.length >= 8;
}

export function isNameValid(name: string) {
  return name.length >= 2;
}

export function arePasswordsSame(password: string, repeatPassword: string) {
  return password === repeatPassword;
}