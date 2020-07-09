import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import request from 'superagent';

class IppPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ipp: null,
    };
  }

  render() {
    console.log(this.state.ipp);
    return (
      <Container>
        <Row style={{ margin: '30px auto', }}>
          <Col>
            <Dropzone onDrop={acceptedFiles => 
              {
                const req = request.post('/api/i/upload');
                console.log(req);
                acceptedFiles.forEach(file => {
                  req.attach(file.name, file);
                });
                req.end();
              }}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default IppPage;
