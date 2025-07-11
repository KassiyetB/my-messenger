import "./Header.css"
import { CiLight, CiDark } from "react-icons/ci";

const Header = ({theme, setTheme}) => {

    const switchTheme = () => {
        switch(theme){
            case "dark":
                setTheme("light");
                break;
            default:
                setTheme("dark");
        }
    }

    return (
        <div id="header">
            <a class="title" href="/">Messenger</a>
            <ul id='header-menu' style={{listStyle:"none"}}>
                <li>
                     <div
                        onClick={switchTheme}
                        onKeyDown={(e) => { if (e.key === 'Enter') switchTheme(); }}
                        tabIndex={0}
                        style={{ color: "var(--txt)", cursor: 'pointer', display:"flex", alignItems:"center" }}
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