import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function CustomAlert({ variant, message}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    );
  }
}