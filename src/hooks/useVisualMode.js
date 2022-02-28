import React from "react";
const { useState } = require("react");

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), mode];
      } else {
        return [...prev, mode];
      }
    })
    // let newHistory = history;
    // if (replace) {
    //   newHistory = history.slice(0, -1);
    // }
    // setMode(mode);
    // setHistory([...newHistory, mode]);
  }

  const back = () => {
    if (history.length < 2) {
      return;
    }
    // const newHistory = history.slice(0, -1);
    // setMode(newHistory[newHistory.length - 1]);
    // setHistory(newHistory);
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  }

  return { mode: history.slice(-1)[0], transition, back };
}