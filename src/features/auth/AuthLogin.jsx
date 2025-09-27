import axios from 'axios';

const API_URL = 'https://api.redseam.redberryinternship.ge/api';


export const AuthLogin = async (form) => {
  const response = await axios.post(`${API_URL}/login`, form,
     {
      email: form.email,
      password: form.password
    },
    
    {headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      },
    }
  );
  
  return response.data;
};