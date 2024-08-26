import React, { useContext, useEffect, useRef, useState } from "react";
import { VideoContext } from "./VideoContext.jsx";

const VideoPlayer = ({ loadYouTubeAPI }) => {
  const { currentVideo, apiReady, setApiReady } = useContext(VideoContext);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const checkAndLoadAPI = () => {
      if (!window.YT) {
        loadYouTubeAPI();
      } else {
        setApiReady(true);
      }
    };

    checkAndLoadAPI();
  }, [loadYouTubeAPI]);

  useEffect(() => {
    if (currentVideo) {
      if (!apiReady) {
        loadYouTubeAPI();
      } else {
        const playerWidth = window.innerWidth * 0.9;
        const playerHeight = (playerWidth * 9) / 16;

        playerRef.current = new window.YT.Player("player", {
          height: playerHeight.toString(),
          width: playerWidth.toString(),
          videoId: currentVideo,
          events: {
            onReady: onPlayerReady,
          },
        });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [currentVideo, apiReady]);

  const onPlayerReady = (event) => {
    setIsVideoLoaded(true);
    event.target.playVideo();
  };

  const handleRateChange = (event) => {
    const rate = parseFloat(event.target.value);
    setPlaybackRate(rate);
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(rate);
    }
  };

  return (
    <div>
      <div id="player" className={isVideoLoaded ? "video-player" : ""}></div>
      {isVideoLoaded && (
        <div className="rate">
          <label htmlFor="playbackRate" className="label-speed">
            Playback Speed :{" "}
          </label>
          <select
            id="playbackRate"
            value={playbackRate}
            onChange={handleRateChange}
            className="list-speed"
          >
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2x</option>
            <option value="2.25">2.25x</option>
            <option value="2.5">2.5x</option>
            <option value="2.75">2.75x</option>
            <option value="3">3x</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
