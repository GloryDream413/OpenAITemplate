import styled, { css, keyframes } from 'styled-components';

export const Loader = ({ active, hidden, ...props }) => <Spinner active={active} {...props} >
<Bounce active={active} hidden={hidden} ></Bounce>
<BounceTwo active={active} hidden={hidden} ></BounceTwo>
<BounceThree active={active} hidden={hidden} ></BounceThree>
</Spinner>

//   width: 2.5em;
// height: 2.5em;
const Spinner = styled.div`
  
    position: relative;
    display:inline-block;
    ${props => !props.active ? css`
      display:none;
    ` : null}
`;

const bounce = keyframes`
  0%,100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }

  50% {
    transform: scale(1.0);
      -webkit-transform: scale(1.0);
  }
`;

const Bounce = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #10b981;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: ${bounce} 3.0s infinite ease-in-out;
    animation: ${bounce} 3.0s infinite ease-in-out;
`;

const BounceTwo = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #3d84f6;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: ${bounce} 3.0s infinite ease-in-out;
    animation: ${bounce} 3.0s infinite ease-in-out;
    animation-delay: -1.0s;
`;

const BounceThree = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #3d84f6;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: ${bounce} 3.0s infinite ease-in-out;
    animation: ${bounce} 3.0s infinite ease-in-out;
    animation-delay: -2.0s;
`;


 

export default Loader