import NavBar from "../components/NavBar/NavBar.jsx";
import '../styles/Content.scss'

const DashBoard = () => {
    return (
        <div className="main-container">
            <NavBar/>
            <div className="content">
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default DashBoard;