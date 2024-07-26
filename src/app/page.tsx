"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import TextAnim from "./textanimation";
import Breathing from "./breathing";

export default function Home() {
  enum POSITION {
    LOADING = "LOADING",
    WELCOME = "WELCOME",
    BREATHING = "BREATHING",
  }

  const [state, setState] = useState(POSITION.LOADING);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(POSITION.WELCOME);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  function beginGuidedBreathing(e: React.MouseEvent) {
    var opacity = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("opacity");

    if (opacity == "1") {
      setState(POSITION.BREATHING);
    }
  }

  function toggleSound() {
    var soundButton = document.getElementById(
      "toggleSoundButton"
    ) as HTMLImageElement;
    var bgm = document.getElementById("bgm") as HTMLAudioElement;
    var campfire = document.getElementById("campfire") as HTMLAudioElement;

    if (bgm != null && bgm.paused) {
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
      {state == POSITION.LOADING && (
        <div id="loadingDiv">
          <p>Loading...</p>
        </div>
      )}
      <div className="accordion" id="creditAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={{ fontSize: "0.75rem" }}
            >
              Credits
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#creditAccordion"
          >
            <div className="accordion-body">
              <p>
                <a href="https://www.instagram.com/pixeladdy/?hl=en">
                  pixeladdy
                </a>{" "}
                - art
              </p>
              <p>
                <a href="https://fontawesome.com">Fontawesome</a> - speaker
                images
              </p>
              <p>
                <a href="https://fontawesome.com">Fontawesome</a> - speaker
                images
              </p>
              <p>
                <a href="https://uppbeat.io/t/tranquilium/night-waves">
                  Uppbeat
                </a>{" "}
                - Music
              </p>
              <p>
                <a href="https://pixabay.com/sound-effects/campfire-crackling-fireplace-sound-119594/">
                  SoundsForYou
                </a>{" "}
                - VFX
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div
          id="hardAccAlert"
          className=" col-md-6 offset-md-3 col-8 offset-2 alert alert-warning alert-dismissible fade show z5"
          role="alert"
        >
          This page works best with browser hardware acceleration turned off.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>

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
        src="/bg.gif"
        fill={true}
        alt="Snow"
        style={{ objectFit: "cover" }}
      />
      {state == POSITION.BREATHING && <Breathing />}
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
