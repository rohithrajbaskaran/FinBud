import NavBar from "../components/NavBar/NavBar.jsx";
import InputData from "../components/InputData/InputData.jsx";
import EditDeleteData from "../components/Edit&DeleteData/EditDeleteData.jsx";

const AddData = () => {
    return (
        <div className="main-container">
            <NavBar />
            <div className="content">
                <h1>Add or Edit Data</h1>
                <InputData></InputData>
                {/* Add additional settings content here */}
                <EditDeleteData></EditDeleteData>
            </div>


        </div>
    );
}

export default AddData;