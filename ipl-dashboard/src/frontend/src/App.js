import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {TeamPage} from "./pages/TeamPages";
import {MatchPage} from "./pages/MatchPage";
import {HomePage} from "./pages/HomePage";
import {AnimatePresence} from "framer-motion";


function App() {

  return (
    <div className="App" >
        <AnimatePresence mode = "wait">
            <Router >
                <Routes >
                    <Route path="/"
                           element={<HomePage />}/>
                    <Route path="/teams/:teamName"
                           element={<TeamPage />} />
                    <Route path="/teams/:teamName/matches/:year"
                           element={<MatchPage />} />
                </Routes>
            </Router>
        </AnimatePresence>

    </div>
  );
}

export default App;
