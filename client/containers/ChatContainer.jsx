import React from 'react';
import ChatForm from '../components/ChatForm';
import Message from '../components/Message';
import io from "socket.io-client"

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    /*  these get filled up when things are Key'd up below */
    this.state = {
      messages: [],
      name: null,
      msg: null
    };

    this.socket = io();
    // addMessage is a function (created further down code) - we need to bind here
    // as not the 'this' we want
    // note that message not explicitly passed in here - we don't invoke it
    // we get the message from socket.io's code
    this.socket.on( "chat", this.addMessage.bind( this ) );

    this.submitForm = this.submitForm.bind(this);
    this.nameKeyUp = this.nameKeyUp.bind(this);
    this.msgKeyUp = this.msgKeyUp.bind(this);
  }

  addMessage( message ) {
    console.log(message);
    var messages = this.state.messages;
    // Spread operator used here - this should 
    // put the message at the start of the array
    var newMessages = [  message, ...messages ];
    // Alternative approach
    // var newMessages = messages.push( message );
    this.setState( { messages: newMessages } );
  }

  nameKeyUp(event) {
    this.setState({
      name: event.target.value
    });
  }

  msgKeyUp(event) {
    this.setState({
      msg: event.target.value
    });
  }

  submitForm(event) {
    event.preventDefault();

    // Make sure we have a name & message before proceeding
    if (this.state.name && this.state.msg) {
      // construct a new message
      let newMessage = { author: this.state.name, text: this.state.msg };

      // this it the 'emit' part
      this.socket.emit( "chat", newMessage );

      // Old code
      // // Same as var messages = this.state.messages; messages.unshift(newMessage)
      // let messages = [newMessage, ...this.state.messages];

      // this.setState({
      //   messages: messages
      // });
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <Message key={index} author={message.author} text={message.text} />
    });

    return (
      <div>
        <ChatForm 
          nameKeyUp={this.nameKeyUp}
          msgKeyUp={this.msgKeyUp}
          onSubmit={this.submitForm}
        />
        {messages}
      </div>
    );
  }
}