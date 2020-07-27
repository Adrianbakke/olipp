import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DropzoneWithPreviews from './DropzoneWithPreviews'
import request from 'superagent';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class IppPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ipp: null,
      model: [],
    };
    this.thumbsContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
    };
  }

  componentDidMount() {
    const p = '/api/i/ipps/' + this.props.match.params.id;
    axios.get(p).then(res => {
      this.setState({ ipp: res.body })
    });
  }

  callModel = (_) => {
    const p = '/api/i/ipps/' + this.props.match.params.id;
    request.post(p).then(res => {
      this.setState({ model: res.body })
    });
  }

  render() {
    return (
      <Container>
        <Row style={{ margin: '30px' }}>
          <Col>
            <DropzoneWithPreviews />
          </Col>
        </Row>
        <Row style={{ margin: '30px' }}>
          <Col>
            <Button variant="primary"
              size="lg"
              onClick={this.callModel}>
              Run model
            </Button>
          </Col>
        </Row>
        <Row style={{ margin: '30px' }}>
          <section className="container">
            <aside style={this.thumbsContainer}>
              {
                this.state.model.map(res =>
                  <Result res={res} />
                )
              }
            </aside>
          </section>
        </Row>
      </Container>
    )
  }
}

function Result(props) {

  const key = Object.keys(props.res)[0];

  const img = {
    display: 'block',
    width: '100%',
    height: '100%'
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const thumbs = (
    <div style={thumb} key={key}>
      <div style={thumbInner}>
        <img
          src={'/media/images/' + key.split("/").pop()}
          style={img}
          alt={key}
        />
      </div>
    </div >
  )

  return (
    <div style={{ textAlign: 'center'}}>
      {thumbs}
      <p>{props.res[key]}</p>
    </div>
  )
}

export default IppPage;
