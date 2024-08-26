import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { VideoContext } from "./components/VideoContext.jsx";
import SearchBar from "./components/SearchBar";
import VideoPlayer from "./components/VideoPlayer.jsx";
import History from "./components/History.jsx";
import "./App.css";

const Container = styled.div`
  padding: 30px;
`;

function App() {
  const {
    setCurrentVideo,
    videoUrl,
    setVideoUrl,
    history,
    setHistory,
    setApiReady,
  } = useContext(VideoContext);
  const [error, setError] = useState("");

  //? Standard URL: https://www.youtube.com/watch?v=eL3sZ6Wexss
  //? Shortened URL: https://youtu.be/eL3sZ6Wexss?si=UbqP79shgkMHG6A
  //* https://youtu.be/eL3sZ6Wexss, the pathname would be /eL3sZ6Wexss.

  //* protocol - "https:"
  //* hostname  - "youtu.be"
  //* pathname  - "/eL3sZ6Wexss?si=UbqP79shgkMHG6A"
  //* search - "?si=UbqP795hgkMHG_6A"

  const extractVideoId = (url) => {
    const parsedUrl = new URL(url);

    //for standard yt url
    if (parsedUrl.hostname.includes("youtube.com")) {
      const urlParams = new URLSearchParams(parsedUrl.search);
      return urlParams.get("v");
    }

    //for shortened yt url
    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1).split("?")[0];
      return videoId;
    }

    setError("Unsupported URL format. Please enter a valid YouTube URL.");
    return null;
  };

  const handleSearch = () => {
    setError("");
    const videoId = extractVideoId(videoUrl);

    if (!videoId) return;

    try {
      setHistory((oldHistory) => {
        if (oldHistory.some((video) => video.id === videoId)) {
          return oldHistory;
        }
        const updatedHistory = [...oldHistory, { id: videoId }];
        return updatedHistory;
      });
      setCurrentVideo(videoId);
    } catch (error) {
      setError("Failed to fetch information.");
    }
    setVideoUrl("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideo(videoId);
  };

  const removeFromHistory = (videoId) => {
    setHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter(
        (video) => video.id !== videoId
      );

      localStorage.setItem("videoHistory", JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  const loadYouTubeAPI = () => {
    window.onYouTubeIframeAPIReady = () => {
      console.log("Extracted Video ID three:", videoId);
      setApiReady(true);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  return (
    <Container className="container">
      <SearchBar
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
      ></SearchBar>
      <div className="video-history">
        <VideoPlayer loadYouTubeAPI={loadYouTubeAPI}></VideoPlayer>
        <History
          handleVideoClick={handleVideoClick}
          removeFromHistory={removeFromHistory}
        ></History>
      </div>
    </Container>
  );
}

export default App;
