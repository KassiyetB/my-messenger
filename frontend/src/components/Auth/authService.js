export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
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
    const result = await loginUser(email, password);
    console.log(result.token);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export const loginUser = async (email, password) => {
    try{
        const response = await fetch('http://localhost:5000/api/auth/login', {
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