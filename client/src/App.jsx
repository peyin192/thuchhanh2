// src/App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./views/Overview";
import Scores from "./views/Scores";
import Attendance from "./views/Attendance";
import Submission from "./views/Submission";

function App() {
  const [activePage, setActivePage] = useState("overview");

  const renderPage = () => {
    switch (activePage) {
      case "scores":
        return <Scores />;
      case "attendance":
        return <Attendance />;
      case "submission":
        return <Submission />;
      case "overview":
      default:
        return <Overview />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <main className="main">{renderPage()}</main>
    </div>
  );
}

export default App;
