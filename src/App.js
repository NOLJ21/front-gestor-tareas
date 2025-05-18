import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtecterRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
export default App;
