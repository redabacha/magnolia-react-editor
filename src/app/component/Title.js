import React from "react";

class Title extends React.Component {
  /**
   * Render the element
   */
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

export default Title;
