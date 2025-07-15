import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ContactList from './components/ContactList/ContactList';
import ChatWindow from './components/ChatWindow/ChatWindow';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          setLoggedIn(true);
          const data = await res.json();
          console.log(data);
          localStorage.setItem('user', JSON.stringify(data))
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Token check failed:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="App" theme={theme} >
      <Header theme={theme} setTheme={setTheme} loggedIn={loggedIn} />
      <div id='main-section'>
        <ContactList />
        <ChatWindow />
      </div>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default App;
