import { Component } from "react";
import BodySection from "../BodySection/BodySection";

class BodySectionWithMarginBottom extends Component {
  render() {
    return(
      <div className="bodySectionWithMargin">
        <BodySection title={this.props.title}>
          {this.props.children}
        </BodySection>
      </div>
    )
  }
}

export default BodySectionWithMarginBottom;
