import React, { useState, useContext } from "react";
import styled from "styled-components";
import { VideoContext } from "./VideoContext.jsx";

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchBar = ({ handleSearch, handleKeyDown }) => {
  const { videoUrl, setVideoUrl } = useContext(VideoContext);

  return (
    <SearchContainer className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search or paste YouTube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </SearchContainer>
  );
};

export default SearchBar;
