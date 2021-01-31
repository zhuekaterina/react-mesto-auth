export const BASE_URL = 'https://api.zhuekaterina.students.nomoredomains.rocks'; 

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((response) => {
        try {
          if (response.status === 200){
            return response.json();
          }
        } catch(e){
          return (e)
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
}; 

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {      
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },      
      body: JSON.stringify({email, password}),    
    })
    .then((res) => {
      if(!res.ok) {
        return res.json()
        .then((err) => {
          console.log(err);
        })
      }
      return res.json();
    })
    .then((data) => {
      if (data.token){
          localStorage.setItem('jwt', data.token);
          return data;
    }
  })
    .catch(err => console.log(err))
}; 

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
    })
    .then((res) => {
      if(!res.ok) {
        return res.json()
        .then((err) => {
          console.log(err);
        })
      }
      return res.json();
    })
    .then((data) => data);
}