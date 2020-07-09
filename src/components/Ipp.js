import React from 'react';
import { Link } from 'react-router-dom';

class Ipp extends React.Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
    };
  };

  componentDidMount = (props) => {
    console.log(this.props.ipp);
  };

  render() {
    const { id, ippname } = this.props.ipp;
    const p = "/ipps/" + ippname;
    return (
      <div style={this.getStyle()}>
        <p>
          <Link to={p}>{ippname}</Link>
        </p>
      </div>
    );
  }
}

export default Ipp;
