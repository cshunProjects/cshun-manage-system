// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthorityLevel() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('cshun-authority-level') || 'guest';
}

export function setAuthorityLevel(authorityLevel) {
  return localStorage.setItem('cshun-authority-level', authorityLevel);
}

export function getAuthorityToken() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('cshun-authority-token') || 'guest';
}

export function setAuthorityToken(authorityToken) {
  return localStorage.setItem('cshun-authority-token', authorityToken);
}
