import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import Game from "./components/Game";

import logo_bonus from "./rock-paper-scissors-master/images/logo-bonus.svg";

import {useState} from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;

  padding: 1.5rem 1.5rem 1.5rem 1.5rem;

  background: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));

  overflow-x: hidden;

  font-family: 'Barlow Semi Condensed', sans-serif;
  z-index: 0;
`

const Header = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  margin-right: 0;
  margin-left: 0;

  border: 3px var(--header_outline) solid;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 1rem 2rem 1rem 2rem;
  margin-bottom: 1.5rem;

  background: transparent;

  @media (min-width: 768px) {
    width: 40%;
  }

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
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 700;

  border-radius: 5px;
  color: var(--score_text);

  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.2);

  span {
    display: block;
    font-size: 3rem;
    color: var(--dark_text);
  }
`

const Rules = styled.button`
  position: absolute;
  background-color: transparent;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px white solid;
  border-radius: 10px;
  padding: 0.6em 1.8em 0.6em 1.8em;
  font-size: 1.2rem;
  color: white;
  text-transform: uppercase;
  font-family: 'Barlow Semi Condensed', sans-serif;
  letter-spacing: 0.2rem;
  
  &:hover, &:active {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    left: auto;
    right: 3rem;
    transform: none;
  }
`

function App() {

    const [score, setScore] = useState(0);

    return (
        <Container>
            <Header>
                <img id="start" src={logo_bonus} alt={"Logo"}/>
                <Score id="end">
                    Score
                    <span>{score}</span>
                </Score>
                <div id="line"></div>
            </Header>
            <Rules>Rules</Rules>
            <Game score={score} setScore={setScore} />
        </Container>
    );
}



export default App;
