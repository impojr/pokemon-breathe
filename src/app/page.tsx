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

  function beginGuidedBreathing() {
    setState(POSITION.BREATHING);
  }

  function restartGuidedBreathing() {
    setState(POSITION.WELCOME);
  }

  return (
    <main>
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
