"use client";
import Image from "next/image";
import { useState } from "react";
import TextAnim from "./textanimation";

export default function Home() {
  enum POSITION {
    WELCOME = "WELCOME",
    BREATHING = "BREATHING",
  }

  const [state, setState] = useState(POSITION.WELCOME);

  function beginGuidedBreathing(e: React.MouseEvent) {
    var opacity = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("opacity");

    if (opacity == "1") {
      setState(POSITION.BREATHING);
    }
  }

  function toggleSound() {
    var soundButton = document.getElementById("toggleSoundButton");
    var bgm = document.getElementById("bgm");
    var campfire = document.getElementById("campfire");

    if (bgm.paused) {
      bgm.play();
      campfire.play();
      soundButton.src = "/volume-high-solid.svg";
    } else {
      bgm.pause();
      campfire.pause();
      soundButton.src = "/volume-xmark-solid.svg";
    }
  }

  function restartGuidedBreathing(e: React.MouseEvent) {
    var opacity = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("opacity");

    if (opacity == "1") {
      setState(POSITION.WELCOME);
    }
  }

  return (
    <main>
      <Image
        id="toggleSoundButton"
        src="/volume-xmark-solid.svg"
        width={30}
        height={30}
        alt="Toggle Sound Button"
        style={{ cursor: "pointer" }}
        onClick={toggleSound}
      />
      <audio id="bgm" src=".\bgm.mp3" controls loop />
      <audio id="campfire" src=".\campfire.mp3" controls loop />
      <Image
        className="backgroundImage"
        src="/Test.png"
        fill={true}
        alt="Snow"
        style={{ objectFit: "cover" }}
      />
      <div className="breathingCircle"></div>
      {state == POSITION.WELCOME && (
        <p id="helloText" className="bottom-centre text-center"></p>
      )}
      {state == POSITION.BREATHING && (
        <p id="breathCountdown" className="white-text"></p>
      )}
      {state == POSITION.BREATHING && (
        <p
          id="breathingIntroText"
          className="bottom-centre white-text text-center"
        >
          Let&apos;s do 5 deep breaths together...
        </p>
      )}
      {state == POSITION.BREATHING && (
        <p
          id="breathingOutroText"
          className="bottom-centre white-text text-center"
        ></p>
      )}
      {state == POSITION.BREATHING && <TextAnim />}
      <button
        className={
          state == POSITION.WELCOME
            ? "imageBtn fadeIn bottom-centre"
            : "imageBtn fadeOut bottom-centre"
        }
        onClick={beginGuidedBreathing}
      >
        Begin Guided Breathing
      </button>
      {state == POSITION.BREATHING && (
        <button
          id="breatheAgainBtn"
          className="imageBtn bottom-centre"
          onClick={restartGuidedBreathing}
        >
          Breathe Again
        </button>
      )}
    </main>
  );
}
