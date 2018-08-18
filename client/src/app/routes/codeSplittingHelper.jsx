import React, { Component } from 'react';

export default importedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { Comp: null };
    }

    async componentDidMount() {
      const { default: component } = await importedComponent();
      this.setState({ Comp: component });
    }

    render() {
      const { Comp } = this.state;
      return Comp ? <Comp {...this.props} /> : null;
    }
  };
