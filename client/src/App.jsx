import React from 'react';
import styled from 'styled-components/macro';


const Button = styled.button`
  background-color: #444eee;
  text-transform: uppercase;
`;

const App = () => {
  return (
    <div>
      <h1>Button</h1>
      <Button>My btn</Button>
    </div>
  );
};

export default App;