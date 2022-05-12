import styled from "styled-components";
import {React, useState, useEffect} from "react";
import Icon from "./Icon";

import pentagramBackground from '../rock-paper-scissors-master/images/bg-pentagon.svg';

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
    left: 50%;
    transform: translate(-50%, 0);
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
    left: rem;
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
  }

  #play_again {
    padding: 10px 20px 10px 20px;
    background-color: white;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    color: black;
  }

  div {
    display: flex;
    width: 100%;

    div {
      flex: 1;
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
    const [hasUserWon, setHasUserWon] = useState(false);

    var choiceEnum = {"spock": 0, "lizard": 1, "rock": 2, "paper": 3, "scissors": 4, "none": 5};

    const [usersChoice, setUsersChoice] = useState(choiceEnum.none);
    const [computersChoice, setComputersChoice] = useState(choiceEnum.none);

    function onPickIcon(choice) {
        setHasUserChosen(true);
        setUsersChoice(choice);
        let cc = Math.floor(Math.random() * 5);
        setComputersChoice(cc);

        let result = compareChoices(choiceEnum.scissors, choice, cc);
        if(result === 1) {
          setHasUserWon(true);
        } else if (result === -1) {
          setHasUserWon(false);
        } 
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
              <div>
                  <div>
                      <Icon choice={usersChoice}/>
                      <p>You Picked</p>
                  </div>
                  <div>
                      <Icon choice={computersChoice}/>
                      <p>The House Picked</p>
                  </div>
              </div>

              { hasUserWon ? (<h1>You Win</h1>) : (<h1>You Lose</h1>) }

              <button id="play_again" onClick={ () => onPlayAgain() }>Play Again</button>
            </StageTwoContainer>
          )}
        </GameContainer>
    )

}

export default Game;