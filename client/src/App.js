import {
  UserInfo,
  Lists,
  SharedLayout,
  ProtectedRoute,
  AddList,
  Friends,
} from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Reset, Register } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Lists />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="add-list" element={<AddList />} />
          <Route path="friends" element={<Friends />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
