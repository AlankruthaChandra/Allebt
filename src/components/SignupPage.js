import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'
import { Container, Card, Segment } from 'semantic-ui-react'

class SignupPage extends Component {
  
  state = {
    email: '',
    password: '',
    name: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center">
        <Segment textAlign='center'>
        
        <form onSubmit={this._signup}>
          <h3>
            Already have an account!!! <a href="/login"> Login</a>
          </h3>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Name"
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Email"
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Enter Password"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />

          <input
            className={`ui button`}
            disabled={
              !this.state.email || !this.state.name || !this.state.password
            }
            type="submit"
            value="Sign Up"
          />
        </form>
       
        </Segment>
      </div>
    )
  }

  _signup = async e => {
    e.preventDefault()
    const { email, name, password } = this.state
    const result = await this.props.signupMutation({
      variables: {
        name,
        email,
        password,
      },
    })

    const token = result.data.signup.token
    localStorage.setItem(AUTH_TOKEN, token)

    this.props.refreshTokenFn &&
      this.props.refreshTokenFn({
        [AUTH_TOKEN]: token,
      })

    this.props.history.replace('/Register')
    window.location.reload()
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export default graphql(SIGNUP_USER_MUTATION, { name: 'signupMutation' })(
  withRouter(SignupPage),
)
