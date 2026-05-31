import { Component } from 'react';

const WithLogging = (WrappedComponent) => {
    class WithLoggingComponent extends Component {
        componentDidMount() {
        }

        componentWillUnmount() {
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithLoggingComponent.displayName = `WithLogging(${componentName})`;

    return WithLoggingComponent;
};

export default WithLogging;
