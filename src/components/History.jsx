import React, { useContext } from "react";
import styled from "styled-components";
import { VideoContext } from "./VideoContext.jsx";

const HistoryContainer = styled.div`
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;

  .history-item {
    width: 150px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    justify-content: flex-start;

    &:hover {
      background-color: #f0f0f0;
    }
    img {
      width: 100%;
      height: 90px;
      margin-right: 10px;
    }
  }
`;

const History = ({ handleVideoClick, removeFromHistory }) => {
  const { history, setCurrentVideo } = useContext(VideoContext);
  console.log("History in History component:", history);

  return (
    <HistoryContainer>
      <h3 className="history-heading">History</h3>
      <div className="row">
        {history.length === 0 ? (
          <p>No History available</p>
        ) : (
          history.map((video) => (
            <div
              key={video.id}
              className="history-item col-md-2"
              onClick={() => handleVideoClick(video.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
              />
              <div className="remove">
                <button
                  className="remove-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(video.id);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </HistoryContainer>
  );
};

export default History;
