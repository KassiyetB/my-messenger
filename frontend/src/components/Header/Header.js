import { useState } from "react";
import "./Header.css"
import { CiLight, CiDark, CiCirclePlus } from "react-icons/ci";
import Auth from "../Auth/Auth";
import { addFriend } from "./menuService";

const Header = ({theme, setTheme, loggedIn}) => {

    const switchTheme = () => {
        switch(theme){
            case "dark":
                setTheme("light");
                break;
            default:
                setTheme("dark");
        }
    }

    const [showAuth, setShowAuth] = useState(false);
    const toggleAuth = (e) => {
        e.preventDefault();
        setShowAuth(!showAuth);

    }

    const toggleLogOut = (e) => {
        localStorage.removeItem("token");
        window.location.reload();

    }

    const [friendId, setFriendId] = useState('');
    const handleNewFriendForm = e => {
        e.preventDefault();
        if (!friendId.trim()) return;
        addFriend(friendId);
        setFriendId('');
    }

    return (
        <div id="header">
            <a className ="title clk-a" href="/">Messenger</a>
            <ul id='header-menu' style={{listStyle:"none"}}>
                {
                    loggedIn 
                    ? <>
                        <li>
                            <form onSubmit={handleNewFriendForm}>
                                <input 
                                    type="text" 
                                    value={friendId}
                                    onChange={(e) => setFriendId(e.target.value)}
                                />
                                <input type="submit" value="+" />
                            </form>
                        </li>
                        <li><a href="/" className="clk-a" onClick={toggleLogOut}>Log Out</a></li> 
                    </>
                    : <li><a href="/" className="clk-a" onClick={toggleAuth}>Sign Up</a></li>
                }
                {showAuth && <Auth isOpen={showAuth} onClose={toggleAuth}/>}
                <li>
                     <div
                        onClick={switchTheme}
                        onKeyDown={(e) => { if (e.key === 'Enter') switchTheme(); }}
                        tabIndex={0}
                        style={{ color: "var(--txt)", display:"flex", alignItems:"center" }}
                        role="button"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <CiLight size={24} /> : <CiDark size={24} />}
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default Header