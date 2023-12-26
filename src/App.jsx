import "./App.css";
import Form from "./components/Form/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import MoreDetailsTask from "./components/MoreDetailsTask/MoreDetailsTask";
import TimerPomodoro from "./components/TimerPomodoro/TimerPomodoro";
import ProtectedRoutes from "./services/ProtectedRoutes";
import ManageFriends from "./views/ManageFriends/ManageFriends";
import FriendSuggestion from "./views/FriendSuggestion/FriendSuggestion";
import MyFriends from "./views/MyFriends/MyFriends";
import AssignedToMe from "./views/Tasks/AssignedToMe/AssignedToMe";
import AssignedToFriends from "./views/Tasks/AssignedToFriends/AssignedToFriends";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Form />} />
      <Route
        element={<ProtectedRoutes permission={localStorage.getItem("token")} />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/task/:id" element={<MoreDetailsTask />} />
        <Route path="/task" element={<MoreDetailsTask />} />
        <Route path="/task/:id/Pomodoro" element={<TimerPomodoro />} />
        
        
        <Route path="/friends" element={<ManageFriends/>} />
        <Route path="/friends/suggestion" element={<FriendSuggestion/>} />
        <Route path="/friends/myFriends" element={<MyFriends />} />

        <Route path="/createTaskForFriend" element={<MoreDetailsTask />} />
        <Route path="/assignedToMe" element={<AssignedToMe />} />
        <Route path="/assignedToFriend" element={<AssignedToFriends />} />

      </Route>
      <Route path="*" element={<div>ruta no encontrada!</div>} />
    </Routes>
  );
}

export default App;
