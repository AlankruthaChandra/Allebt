import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react'

export default function Success(props) {

  let outMessage = '';

  if (props.message){
    outMessage = props.message
  }
  else {
    outMessage = "Registration successfull"
  }

  return (
    <Container>  
      <Header>{outMessage}</Header>
    </Container>
  );
}