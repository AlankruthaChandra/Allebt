import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import Success from './Success'
import { Button, Form, Container, Divider, Header, Image, Card } from 'semantic-ui-react'


class Register extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateRegister = this.updateRegister.bind(this);
    this.state = {
      ebtCardNumber: '',
      phoneNumber: '',
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateRegister = async e => {
    e.preventDefault();
    const RID = this.props.data.me.ebtRegistration.id
    const {
      ebtCardNumber,
      phoneNumber
    } = this.state;

    console.log(RID, ebtCardNumber, phoneNumber)

    await this.props.updateRegister({
      variables: { 
        id: RID,
        ebtCardNumber: ebtCardNumber,
        phoneNumber: phoneNumber,
      },
    })
    this.props.history.replace('/success')
  };

  render() {
    const { activeItem } = this.state
    const userData = this.props.data.me
    if (userData){
      const isRegistered = userData.ebtRegistration.isRegistered
      
      if (isRegistered) {
        return(
          <Success 
            message="Already registered"
          />
        )
      }
      return (
        <Container>
          <Header as='h1'>Verify Information</Header>
            <Form>
              <Divider />
              <Form.Field>
                <label>EBT Card Number</label>
                <input 
                  name='ebtCardNumber'
                  placeholder='#no' 
                  value={this.state.ebtCardNumber}
                  onChange={this.handleChange}
                />
              </Form.Field>
              
              <Form.Field>
                <label>Phone Number</label>
                <input 
                  name='phoneNumber'
                  placeholder='Phone Number' 
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </Form.Field>
              
              <Button type='upload'>Upload EBT Card</Button>
              
              <Divider />
              <Button onClick={this.updateRegister} >Submit</Button>
            </Form>
        </Container>
      )
    }
    return(
      <Container><div>Loading</div></Container>
    )
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
      ebtRegistration{
        id
        ebtCardNumber
        phoneNumber
        isRegistered
      }
    }
  }
`

const REGISTER_MUTATION = gql`
  mutation updateRegister($id: ID!, $ebtCardNumber: String!, $phoneNumber: String!) {
    updateRegister(id: $id, ebtCardNumber: $ebtCardNumber, phoneNumber: $phoneNumber){
      id
      ebtCardNumber
      phoneNumber
    }
  }
`

export default compose(
  graphql(ME_QUERY, {
    options: {
      errorPolicy: 'all',
    },
  }),
  graphql(REGISTER_MUTATION, {
    name: 'updateRegister',
    options: {
      errorPolicy: 'all',
    },
  }),
  withRouter,
)(Register)