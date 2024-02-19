import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Wnav from './components/nav';
import Wfooter from "./components/footer";
import Wbackground from "./components/background";
import Wcontent from "./components/logo";
import Wabout from "./components/about";
import 'bootstrap/dist/css/bootstrap.min.css';
import Wbuttons from "./components/buttons";
import { motion, AnimatePresence } from 'framer-motion';
import Waudio from './components/audio';
import { RecoilRoot } from 'recoil';
import Wlogin from './components/login';
import 'tailwindcss/tailwind.css';
import Wleaderboard from './components/leaderboard';

function Website() {
  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      </style>
      {/* Background Component managed by 'videoState'*/}
      <RecoilRoot>
        {/* Recoil State Management Wrapper ''Maybe make Active Component States rather than using ReactRouter'*/}
        <Wbackground />
        <Waudio /> {/* Audio Component managed by 'audioState'*/}
        <Wnav /> {/* Nav Component */}
        <div className="center">
          {/* Main Content Div 'center' */}
          <Routes>
            {/* Routes for nav Links */}
            <Route
              path="/"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='home'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wcontent />
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/media"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='media'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wabout />
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/stats"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='stats'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wleaderboard/>
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/login"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='login'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wlogin />
                  </motion.div>
                </AnimatePresence>
              }
            />
          </Routes>
        </div>
        <Wbuttons /> {/* Side Nav Buttons - '''Needs work for scaling'''*/}
        <Wfooter /> {/* Footer Component '' Works fine ''*/}
      </RecoilRoot>
      {/* Recoil State Management Wrapper*/}
    </div>
  );
}

export default Website;