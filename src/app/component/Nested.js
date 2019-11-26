import React from "react";
import { Area } from "@magnolia/magnolia-react-renderer";

class Title extends React.Component {
  /**
   * Render the element
   */
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Area key={"nestedArea"} content={this.props.nestedArea} />
      </div>
    );
  }
}

export default Title;
