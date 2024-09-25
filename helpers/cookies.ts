export function setCookie(name: string, value: string, days: number): void {
  let expires: string = '';
  if (days) {
    const date: Date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function eraseCookie(name: string): void {
  console.log('here');
  document.cookie = name + '=; Max-Age=0';
}

export function getCookie(name: string): null | string {
  const nameEQ: string = name + '=';
  const cookies: string[] = document.cookie.split(';');

  for (let i: number = 0; i < cookies.length; i++) {
    let cookie: string = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}
