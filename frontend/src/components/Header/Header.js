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

    const [showAddFriend, setShowAddFriend] = useState(false);
    const toggleAddFriend = (e) => {
        e.preventDefault();
        setShowAddFriend(!showAddFriend);

    }

    
    

    return (
        <div id="header">
            <a className ="title clk-a" href="/">Messenger</a>
            <ul id='header-menu' style={{listStyle:"none"}}>
                {
                    loggedIn 
                    ? <>
                        <li><CiCirclePlus size={24} onClick={toggleAddFriend}  /></li>
                        <li><a href="/" className="clk-a" onClick={toggleLogOut}>Log Out</a></li> 
                    </>
                    : <li><a href="/" className="clk-a" onClick={toggleAuth}>Sign Up</a></li>
                }
                {showAuth && <Auth onClose={toggleAuth}/>}
                {showAddFriend && <AddFriendModal onClose={toggleAddFriend}/>}
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


const AddFriendModal = ({onClose}) => {
    const [friendId, setFriendId] = useState('');
    const handleNewFriendForm = e => {
        e.preventDefault();
        if (!friendId.trim()) return;
        addFriend(friendId);
        setFriendId('');
    }
    return (
        <div className="modal">
            <div className="modal-box">
                <button id='auth-close-btn' className='btn-ghost' onClick={e=>{
                    onClose(e);
                }}><p>X</p></button>
                <form id="add-friend-form" onSubmit={handleNewFriendForm}>
                    
                    <input 
                        type="text" 
                        value={friendId}
                        placeholder="Type friend's short ID ..."
                        onChange={(e) => setFriendId(e.target.value)}
                    />
                    <input type="submit" className="btn" value="Add" />
                </form>
            </div>
        </div>
    )
}
export default Header