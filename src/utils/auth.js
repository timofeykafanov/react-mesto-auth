export const BASE_URL = 'https://api.nomoreparties.co';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const getJson = (response) => {
  if (response.ok){
    return response.json();
  }
  throw new Error({status: response.status});
}

export const register = (username, password, email, calGoal) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({username, password, email, ru_cal_goal: calGoal})
  })
  .then(getJson)
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({identifier, password})
  })
  .then(getJson)
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...HEADERS,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getJson)
}