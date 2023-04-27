import { Route, Routes } from "react-router-dom";
import "./App.css";
import UrlScraper from "./componet/task";
import Contain from "./componet/Contain";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<UrlScraper></UrlScraper>}></Route>
                <Route path="/content" element={<Contain />}></Route>
            </Routes>
        </>
    );
}

export default App;
