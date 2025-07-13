import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ContactList from './components/ContactList/ContactList';
import ChatWindow from './components/ChatWindow/ChatWindow';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="App" theme={theme} >
      <Header theme={theme} setTheme={setTheme}  />
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
