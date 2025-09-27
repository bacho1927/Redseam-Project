export const PostRequest = async (endpoint,token,payload) => {
     const API_BASE_URL = 'https://api.redseam.redberryinternship.ge/api';
    const url = `${API_BASE_URL}/${endpoint}`;


  
const res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(payload),
      });

 return await res.json();


 

};

