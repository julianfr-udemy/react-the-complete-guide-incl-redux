import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

export default (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(
        response => response,
        error => { this.setState({ error }) });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
}