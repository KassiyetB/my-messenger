const API_URL = process.env.REACT_APP_API_URL;

export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Signup failed');
    }
    await loginUser(email, password);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export const loginUser = async (email, password) => {
    try{
        const response = await fetch(`${API_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok){
            throw new Error(data.msg || 'login failed');
        }

        localStorage.setItem('token', data.token);
        return { success: true, token: data.token };

    }catch(err){
        console.error('Login error:', err.message);
        return { success: false, error: err.message };
    }
    
}