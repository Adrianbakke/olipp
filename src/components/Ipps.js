import React from 'react';
import Ipp from './Ipp'

class Ipps extends React.Component {
  render() {
    console.log(this.props.ipps);
    return this.props.ipps.map((ipp) => (
      <Ipp key={ipp.id} ipp={ipp} />
    ));
  }
}

export default Ipps;
