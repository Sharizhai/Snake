import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import GamePage from "./GamePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
        </Routes>
    );
};

export default AppRoutes;