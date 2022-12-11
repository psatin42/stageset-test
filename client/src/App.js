import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [info, setInfo] = useState('');
  const [error, setError] = useState(null);
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
