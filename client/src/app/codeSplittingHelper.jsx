import React from 'react';

export default importedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Component: null };
    }

    async componentDidMount() {
      const { default: component } = await importedComponent();
      this.setState({ Component: component });
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };
