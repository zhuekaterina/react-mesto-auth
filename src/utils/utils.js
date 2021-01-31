export const apiInfo = {
    baseUrl: 'https://api.zhuekaterina.students.nomoredomains.rocks',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
};
