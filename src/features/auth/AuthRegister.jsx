import axios from 'axios';

const API_URL = 'https://api.redseam.redberryinternship.ge/api';


export const AuthRegister = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData,
     {headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        
      },
    }
  );
  return response.data;
};