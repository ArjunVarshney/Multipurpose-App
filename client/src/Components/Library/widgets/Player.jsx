import React, { useContext } from "react";
import { useState } from "react";
import { API } from "../../../Services/api.js";
import {
  speech,
  getVoices,
  startPlaying,
  pauseSpeech,
  cancelSpeech,
  updateSpeech,
} from "../../../Services/textToSpeech";

// context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/Pause";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material";
import { useEffect } from "react";

const Player = ({ close, setClose, currentBlog }) => {
  const content = currentBlog.content
    ? "Title:" +
      "! . ! . !" +
      currentBlog.title +
      "! . ! . ! . ! . !" +
      currentBlog.content.replace(/<[^>]+>/g, "") +
      "! . ! . ! . ! . !" +
      "Thanks for listening..."
    : "";
  const [voices, setVoices] = useState([]);
  const [play, setPlay] = useState(false);
  const [speaker, setSpeaker] = useState({});
  const rateArr = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const [rate, setRate] = useState(1);
  const [char, setChar] = useState(0);
  const [prevChar, setPrevChar] = useState(0);
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("Unknown");
  const { primaryThemeColor, secondaryBgColor, primaryTextColor, textWhite } =
    useContext(color);

  const getUser = async (id) => {
    if (!id) return;
    const response = await API.getUsername("", `/user/get/${id}`);
    const data = await response.data;
    if (data.success) {
      setUsername(data.data.username);
    }
  };

  speech.addEventListener("boundary", (e) => {
    if (content && play) {
      setProgress((char / content.length) * 100);
      setChar(prevChar + e.charIndex);
    }
  });

  speech.addEventListener("end", () => {
    setProgress(0);
    setPrevChar(0);
    setChar(0);
    setPlay(false);
    cancelSpeech();
  });

  useEffect(() => {
    setVoices(getVoices());
    setPlay(!close);
    getUser(currentBlog.created_by);
    setProgress(0);
    setPrevChar(0);
  }, [close]);

  useEffect(() => {
    if (play && !close) {
      startPlaying(
        content,
        rate,
        speaker.voiceURI ? speaker : voices[0],
        prevChar
      );
    } else if (!play & !close) {
      if (speechSynthesis.speaking) pauseSpeech();
      else cancelSpeech();
    } else if (close) {
      setPrevChar(0);
      setChar(0);
      cancelSpeech();
    }
  }, [play, close]);

  useEffect(() => {
    if (voices.length > 0) setSpeaker(voices[0]);
  }, [voices]);

  useEffect(() => {
    setPrevChar(char);
    if (speaker.voiceURI && !close) updateSpeech(rate, speaker);
  }, [rate, speaker]);

  const PlayerBox = styled(Box)({
    height: "120px",
    boxShadow: `0 0 3px 0 ${secondaryBgColor}`,
    borderRadius: "10px",
    margin: "0 5px 5px 0",
    width: "400px",
    position: "fixed",
    bottom: "0",
    right: "0",
    background: textWhite,
    zIndex: "1",
  });

  const ProgressBar = styled(Slider)({
    color: primaryThemeColor,
  });

  const ImageBox = styled(Box)({
    background: `url("https://source.unsplash.com/random/") center/cover`,
    width: "100%",
    height: "100%",
    borderRadius: "10px 0 0 10px",
    boxSizing: "border-box",
    border: `1px solid ${textWhite}`,
    borderRight: "none",
  });

  return (
    <PlayerBox id="playBox" style={{ display: close ? "none" : "flex" }}>
      {/* For closing */}
      <CloseRoundedIcon
        style={{
          fontSize: "18px",
          float: "right",
          margin: "7px",
          position: "absolute",
          right: "0",
        }}
        onClick={() => {
          setClose(true);
        }}
      />
      {/* For images */}
      <Box style={{ width: "30%", height: "100%", overflow: "hidden" }}>
        <ImageBox />
      </Box>

      {/* For other than images */}
      <Box style={{ width: "70%" }}>
        {/* For title and username */}
        <Box style={{ padding: "10px 10px" }}>
          {/* For title */}
          <Typography
            variant="h5"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "Inter",
              width: "90%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentBlog.title}
          </Typography>
          {/* For username */}
          <Typography>{username}</Typography>
        </Box>

        {/* For player */}
        <Box style={{ padding: "0 15px 0 10px" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "18px",
              alignItems: "flex-start",
              marginBottom: "5px",
            }}
          >
            <Button
              style={{
                padding: "0",
                minWidth: "unset",
                marginBottom: "7px",
                color: primaryThemeColor,
              }}
              onClick={() => {
                setPlay(!play);
              }}
            >
              <PlayArrowRoundedIcon
                style={{ display: play ? "none" : "block" }}
              />
              <PauseIcon style={{ display: play ? "block" : "none" }} />
            </Button>
            <Button
              style={{
                opacity: "0.5",
                minWidth: "unset",
                minHeight: "unset",
                padding: "0 5px",
                color: primaryTextColor,
              }}
              onClick={() => {
                setRate(rateArr[(rate / 0.25) % 8]);
              }}
            >
              x{rate}
            </Button>
            <Button
              style={{
                opacity: "0.5",
                minWidth: "unset",
                minHeight: "unset",
                padding: "0 5px",
                color: primaryTextColor,
              }}
              onClick={() => {
                setSpeaker(
                  voices[(voices.indexOf(speaker) + 1) % voices.length]
                );
              }}
            >
              {speaker.voiceURI &&
                speaker.voiceURI.substring(
                  speaker.voiceURI.indexOf(" ") + 1,
                  speaker.voiceURI.indexOf("-") - 1
                )}
            </Button>
            <Typography
              style={{
                opacity: "0.7",
                margin: "0 7px 0 0",
                height: "fit-content",
              }}
            >
              {Math.floor(progress)}%
            </Typography>
          </Box>
          {/* For proress */}
          <Box>
            <ProgressBar
              aria-label="time-indicator"
              size="small"
              value={progress}
              onChange={(_, value) => {
                // setProgress(value);
                cancelSpeech();
                setPrevChar(Math.floor((value / 100) * content.length));
                startPlaying(
                  content.substring(Math.floor((value / 100) * content.length))
                );
                setPlay(true);
                updateSpeech(rate, speaker);
              }}
            />
          </Box>
        </Box>
      </Box>
    </PlayerBox>
  );
};

export default Player;
