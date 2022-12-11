import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { io } = require("socket.io-client");

function App() {
  const [info, setInfo] = useState('');
  const [error, setError] = useState(null);
  const socket = io("ws://localhost:3001/");
  useEffect(() => {
    console.log('component mount');
    socket.on("connect", () => {
      console.log('Websocket connection established');
      console.log(socket.id);
    });
  }, []);
  useEffect(() => {
    console.log('from useEffect');
    socket.emit('update', info);
  }, [info])
  socket.on('from server', (update) => {
    console.log('updating');
    setInfo(update);
  })
  function changeHandler(e) {
    setInfo(e.target.value);
  }
  function submitHandler(e) {
    setError(null);
    e.preventDefault();
    axios.post('http://localhost:3001/new-info', { info })
      .then((data) => console.log(data))
      .catch((error) => setError(error.message));
    setInfo('');
  }
  return (
    <Container>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Write your message</Form.Label>
          <p style={{color: 'red'}}>{error}</p>
          <Form.Control as="textarea" rows={5} onChange={changeHandler} value={info} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitHandler}>
        Submit
      </Button>
      </Form>
      </Container>
  );
}

export default App;
