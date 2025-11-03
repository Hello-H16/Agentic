import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
