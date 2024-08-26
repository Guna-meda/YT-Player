import React, { createContext, useState } from "react";
import { useEffect } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem("videoHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("videoHistory", JSON.stringify(history));
    }
  }, [history]);
  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
        videoUrl,
        setVideoUrl,
        history,
        setHistory,
        apiReady,
        setApiReady,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
