import React from "react";

function WithLogging(WrappedComponent) {
  class WithLoggingComponent extends React.Component {
    getComponentName() {
      const wrappedComponent =
        WrappedComponent.displayName || WrappedComponent.name || "Component";
      return wrappedComponent;
    }

    componentDidMount() {
      console.log(`Component ${this.getComponentName()} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${this.getComponentName()} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${WrappedComponent})`;

  return WithLoggingComponent;
}

export default WithLogging;
