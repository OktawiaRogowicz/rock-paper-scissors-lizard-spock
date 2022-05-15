import styled from "styled-components";

import icon_rock from "../rock-paper-scissors-master/images/icon-rock.svg";
import icon_paper from "../rock-paper-scissors-master/images/icon-paper.svg";
import icon_scissors from "../rock-paper-scissors-master/images/icon-scissors.svg";
import icon_spock from "../rock-paper-scissors-master/images/icon-spock.svg";
import icon_lizard from "../rock-paper-scissors-master/images/icon-lizard.svg";
import { keyframes } from "styled-components";

export const PulseOpacityAnimation = keyframes`
    0% {
        opacity: 0.15;
    }
    70% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`

export const PulseScaleAnimation = keyframes`
    0% {
        transform: scale(1.0);
    }
    70% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1.0);
    }
`

const Container = styled.button`
  position: relative;
  max-height: 7rem;
  max-width: 7rem;
  height: 7rem;
  width: 7rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: inset 0 -0.3em rgba(0, 0, 0, 0.2), 0 5px 5px rgb(0, 0, 0, 0.2);

  border: none;
  
  &:hover, &:active {
      cursor: pointer;
      animation: ${PulseScaleAnimation} 1250ms infinite;

      &::after, &::before {
        animation: ${PulseOpacityAnimation} 1250ms infinite, ${PulseScaleAnimation} 1250ms infinite;
      }
      
  }

  div {
    position: relative;
    max-height: 5.1rem;
    max-width: 5.1rem;
    height: 5.1rem;
    width: 5.1rem;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: inset 0 0.3em rgba(0, 0, 0, 0.2);

    img {
        position: relative;
        width: 55%;
        height: 55%;
    }
  }
`

const Icon = ({onPickIcon, choice}) => {
    var iconList = [icon_spock, icon_lizard, icon_rock, icon_paper, icon_scissors];
    var borderColorList = ["linear-gradient(to top, hsl(189, 59%, 53%), hsl(189, 58%, 57%))",
    "linear-gradient(to top, hsl(261, 73%, 60%), hsl(261, 72%, 63%))",
    "linear-gradient(to top, hsl(349, 71%, 52%), hsl(349, 70%, 56%))",
    "linear-gradient(to top, hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
    "linear-gradient(to top, hsl(39, 89%, 49%), hsl(40, 84%, 53%))"]

    return (
        <Container
            onClick={ () => onPickIcon(choice) }
            id={choice}
            style={{backgroundImage: borderColorList[choice]}}
        >
            <div>
                <img src={iconList[choice]} alt={choice}/>
            </div>
        </Container>
    )
}

export default Icon; 