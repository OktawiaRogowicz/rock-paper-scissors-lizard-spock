import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

import logo_bonus from "./rock-paper-scissors-master/images/logo-bonus.svg";
import icon_rock from "./rock-paper-scissors-master/images/icon-rock.svg";
import icon_paper from "./rock-paper-scissors-master/images/icon-paper.svg";
import icon_scissors from "./rock-paper-scissors-master/images/icon-scissors.svg";
import icon_spock from "./rock-paper-scissors-master/images/icon-spock.svg";
import icon_lizard from "./rock-paper-scissors-master/images/icon-lizard.svg";
import {useState} from "react";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;

  box-sizing: border-box;
  padding: 1.5rem;

  background: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));

  overflow-y: hidden;
  overflow-x: hidden;
`

const Header = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 3px white solid;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;

  background: transparent;

  img {
    height: 100%;
    object-fit: contain;
  }
`

const Score = styled.div`
  height: 100%;
  min-width: 5rem;

  box-sizing: border-box;
  padding: 0.5rem;
  margin: auto 0 auto auto;

  background-color: white;
  text-align: center;
  font-size: 1rem;

  span {
    display: block;
    font-size: 2rem;
  }
`

const Rules = styled.button`
  position: absolute;
  background-color: transparent;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px white solid;
  border-radius: 5px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
`

const Pentagon = styled.div`
  position: relative;
  display: flex;
  min-width: 100%;
  background-color: powderblue;

  #scissors {
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  #spock {
    top: 7.5rem;
  }

  #paper {
    top: 7.5rem;
    right: 0;
  }

  #lizard {
    top: 15rem;
    left: 2rem;
  }

  #rock {
    top: 15rem;
    right: 2rem;
  }
`

const Icon = styled.button`
  position: absolute;
  min-height: 6rem;
  min-width: 6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 0.75rem gold solid;
  border-radius: 50%;
`

const Game = styled.div`
  text-transform: uppercase;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    font-size: 1rem;
  }

  h1 {
    font-size: 3rem;
  }

  button {
    padding: 10px 20px 10px 20px;
    background-color: white;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    color: black;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }

`


function App() {

    const [score, setScore] = useState(0);

    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    var choiceEnum = {"spock": 0, "lizard": 1, "rock": 2, "paper": 3, "scissors": 4}

    function compareChoices(usersChoice, computersChoice) {
        let modulo = choiceEnum.scissors;
        if (computersChoice === usersChoice) {
            return 0;
        } else if (
            computersChoice === mod(usersChoice - 1, modulo) ||
            computersChoice === mod(usersChoice - 3, modulo)) {
            return -1;
        }
        return 1;
    }

    function onPickIcon(choice) {
        let computersChoice = Math.floor(Math.random() * 5);
        console.log("ai choice: ", computersChoice);
        let result = compareChoices(choice, computersChoice);
        console.log("result: ", result);
        setScore(score + result);
    }

    return (
        <Container>
            <Header>
                <img src={logo_bonus} alt={"Logo"}/>
                <Score>
                    Score
                    <span>{score}</span>
                </Score>
            </Header>
            <Rules>Rules</Rules>

            <Game>
              {/* <Pentagon>
                  <Icon onClick={ () => onPickIcon(choiceEnum.scissors) } id="scissors"><img src={icon_scissors} alt={"Scissors"}/></Icon>
                  <Icon onClick={ () => onPickIcon(choiceEnum.spock) } id="spock"><img src={icon_spock} alt={"Spock"}/></Icon>
                  <Icon onClick={ () => onPickIcon(choiceEnum.paper) } id="paper"><img src={icon_paper} alt={"Paper"}/></Icon>
                  <Icon onClick={ () => onPickIcon(choiceEnum.lizard) } id="lizard"><img src={icon_lizard} alt={"Lizard"}/></Icon>
                  <Icon onClick={ () => onPickIcon(choiceEnum.rock) } id="rock"><img src={icon_rock} alt={"Rock"}/></Icon>
              </Pentagon> */}

              <div>
                <div>
                  <p>You Picked</p>
                </div>
                <div>
                  <p>The House Picked</p>
                </div>
              </div>

              <h1>You Win</h1>
              <h1>You Lose</h1>

              <button>Play Again</button>
            </Game>
        </Container>
    );
}

export default App;
