import { MainRoute } from "../../Route/MainRoute/MainRoute";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import "./MainLayout.css";

export function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
			<header>
                <Header/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"/>
            </header>
            <aside>
                <Menu/>
            </aside>
            <main>
                <MainRoute/>
                <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
        
    );
}
