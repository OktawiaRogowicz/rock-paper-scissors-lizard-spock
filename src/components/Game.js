import styled from "styled-components";
import {React, useState, useEffect} from "react";
import Icon, { PulseOpacityAnimation, PulseScaleAnimation } from "./Icon";

import pentagramBackground from '../rock-paper-scissors-master/images/bg-pentagon.svg';
import { css, keyframes } from "styled-components";

const Pentagon = styled.div`
  position: relative;
  display: flex;
  max-width: 20rem;
  min-width: 20rem;
  min-height: 20rem;
  max-height: 20rem;
  color: white;

  background-image: url("${pentagramBackground}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  &>*:nth-child(1) {
    position: absolute;
    top: -2rem;
    left: 0;
    right: 0;
    margin: auto;
  }

  &>*:nth-child(2) {
    position: absolute;
    top: 5rem;
    left: -2rem;
  }

  &>*:nth-child(3) {
    position: absolute;
    top: 5rem;
    right: -2rem;
  }

  &>*:nth-child(4) {
    position: absolute;
    bottom: -2rem;
    left: 1rem;
  }

  &>*:nth-child(5) {
    position: absolute;
    bottom: -2rem;
    right: 1rem;
  }
`

const GameContainer = styled.div`
  position: relative;
  text-transform: uppercase;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 60%;
  width: 100%;
`

const ResultTextAnimation = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
    opacity: 1.0;
  }
  100% {
    transform: scale(1.0);
    opacity: 1.0;
  }
`

const StageTwoContainer = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1rem;
  }

  h1 {
    font-size: 3rem;
    animation: ${ResultTextAnimation} 1250ms calc(1250ms + 1250ms) both;
  }

  #play_again {
    padding: 1rem 3rem 1rem 3rem;
    background-color: white;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    color: black;
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 1rem;
    opacity: 1;
    animation: ${ResultTextAnimation} 1250ms calc(1250ms + 1250ms + 1250ms) both, ${PulseScaleAnimation} 1250ms calc(1250ms + 1250ms + 1250ms + 1250ms) infinite;

    &:hover, &:active, &:focus {
      cursor: pointer;
    }
  }
`

const ChoiceContainer = styled.div`
  display: flex;
  width: 100%;
`

const Choice = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  &>*:nth-child(1){
    pointer-events: none;
  }
`

const UsersChoice = styled(Choice)`
  &>*:nth-child(1){
    animation: ${PulseScaleAnimation} 1250ms;
  }
  &>*:nth-child(1)::after, &>*:nth-child(1)::before {
    ${props => props.hasUserWon === true ?
      css`
        content: '';
        position: absolute;
        height: 135%;
        width: 135%;
        background-color: white;
        border-radius: 50%;
        opacity: 0;
        z-index: -1;
        animation: ${PulseScaleAnimation} 1250ms calc(1250ms + 1250ms + 1250ms) infinite, ${PulseOpacityAnimation} 1250ms calc(1250ms + 1250ms + 1250ms) infinite;
      `
      : ''};
  }
`

const ComputersChoiceAnimation = keyframes`
  0% {
    filter: brightness(0);
    opacity: 0.2;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const ComputersChoice = styled(Choice)`
  &>*:nth-child(1){
    animation: ${ComputersChoiceAnimation} 1250ms 1250ms both;
  }
  &>*:nth-child(1)::after, &>*:nth-child(1)::before {
    ${props => props.hasUserWon === false ?
      css`
        content: '';
        position: absolute;
        height: 135%;
        width: 135%;
        background-color: white;
        border-radius: 50%;
        opacity: 0;
        z-index: -1;
        animation: ${PulseScaleAnimation} 1250ms calc(1250ms + 1250ms + 1250ms) infinite, ${PulseOpacityAnimation} 1250ms calc(1250ms + 1250ms + 1250ms) infinite;
      `
      : ''};
  }
`

function mod(n, m) {
  return ((n % m) + m) % m;
}

function compareChoices(modulo, usersChoice, computersChoice) {
  if (computersChoice === usersChoice) {
      return 0;
  } else if (
      computersChoice === mod(usersChoice - 1, modulo) ||
      computersChoice === mod(usersChoice - 3, modulo)) {
      return -1;
  }
  return 1;
}

const Game = ({score, setScore}) => {

    const [hasUserChosen, setHasUserChosen] = useState(false);
    const [hasUserWon, setHasUserWon] = useState(0);
    // 1 - user won, 0 - tie, -1 - computer;

    var choiceEnum = {"spock": 0, "lizard": 1, "rock": 2, "paper": 3, "scissors": 4, "none": 5};

    const [usersChoice, setUsersChoice] = useState(choiceEnum.none);
    const [computersChoice, setComputersChoice] = useState(choiceEnum.none);

    function onPickIcon(choice) {
        setHasUserChosen(true);
        setUsersChoice(choice);
        let cc = Math.floor(Math.random() * 5);
        setComputersChoice(cc);

        let result = compareChoices(choiceEnum.scissors, choice, cc);
        setHasUserWon(result);
        setScore(score + result);
    }

    function onPlayAgain() {
        setHasUserChosen(false);
        setHasUserWon(false);
    }

    return (
        <GameContainer>
          {!hasUserChosen ? (
            <Pentagon>
              <Icon onPickIcon={onPickIcon} choice={choiceEnum.scissors}/>
              <Icon onPickIcon={onPickIcon} choice={choiceEnum.spock}/>
              <Icon onPickIcon={onPickIcon} choice={choiceEnum.paper}/>
              <Icon onPickIcon={onPickIcon} choice={choiceEnum.lizard}/>
              <Icon onPickIcon={onPickIcon} choice={choiceEnum.rock}/>
            </Pentagon>
          ) : (
            <StageTwoContainer>
              <ChoiceContainer>
                  <UsersChoice hasUserWon={hasUserWon}>
                      <Icon choice={usersChoice}/>
                      <p>You Picked</p>
                  </UsersChoice>
                  <ComputersChoice hasUserWon={hasUserWon}>
                      <Icon choice={computersChoice}/>
                      <p>The House Picked</p>
                  </ComputersChoice>
              </ChoiceContainer>

              { hasUserWon === 1 ? (<h1>You Win</h1>) : (
                hasUserWon === 0 ? (<h1>Tie</h1>) : (<h1>You Lose</h1>)
              ) }

              <button id="play_again" onClick={ () => onPlayAgain() }>Play Again</button>
            </StageTwoContainer>
          )}
        </GameContainer>
    )

}

export default Game;