import NavBar from "../components/NavBar/NavBar.jsx";
import InputData from "../components/InputData/InputData.jsx";

const AddData = () => {
    return (
        <div className="main-container">
            <NavBar />
            <div className="content">
                <h1>Add or Edit Data</h1>
                <InputData></InputData>
                {/* Add additional settings content here */}
            </div>
        </div>
    );
}

export default AddData;