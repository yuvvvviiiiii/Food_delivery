const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const register = async (data) =>{
  const response = await fetch(`${BACKEND_URL}/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  if(response.status === 201 || response.status === 400){
    return response.json();
  } else {
    throw new Error('Error registering user');
  }
}

export const login = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  if(response.status === 200){
    return response.json();
  } else {  
    throw new Error('Error logging in user');
  }
}

export const fetchImage = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/home`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  // console.log(response);

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error fetching data');
  }
};

export const fetchProducts = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error fetching data');
  }
}

export const checkOutCart = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/cart/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  })

  if(response.status === 200){
    return response.json();
  } else{
    throw new Error('Error checking out cart');
  }
}

export const fetchOrders = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/cart/my-orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  })

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error fetching orders');
  }
}

export const addAddress = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/address`,{
    method: 'POST',
    headers:{
      'Content-type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data)
  })

  if(response.status === 200 ){
    return response.json();
  } else {
    throw new Error('Error adding address');
  }
};

export const fetchAddress = async() => {
  const response = await fetch(`${BACKEND_URL}/api/address`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify()
  })

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error fetching address');
  }
}

export const deleteAddress = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/address/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
  })

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error deleting address');
  }
}

export const getUser = async () => {
  const response = await fetch(`${BACKEND_URL}/api/user`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },

  });
  if(response.status == 200){
    return response.json();
  } else {
    throw new Error('Error fetching user');
  }
}

export const updateUser = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
    
  });
  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error updating user');
  }
}

export const addCardDetails = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/card-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error adding card details');
  }
}

export const updateCardDetails = async (cardId, data) => {
  const response = await fetch(`${BACKEND_URL}/api/card-details/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error updating card details');
  }
}

export const fetchCardDetails = async () => {
  const response = await fetch(`${BACKEND_URL}/api/card-details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
    
  });

  if(response){
    return response.json();
  } else {
    throw new Error('Error fetching card details');
  }
};

export const deleteCardDetails = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/card-details/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`,
    },
  });

  if(response.status === 200){
    return response.json();
  } else {
    throw new Error('Error deleting card details');
  }
}
