import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';

export default (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(request => {
      setError(null);
      return request;
    });

    const resInterceptor = axios.interceptors.response.use(
      response => response,
      error => setError(error)
    );

    const errorConfirmedHandler = () => setError(null);

    useEffect(() => () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    }, [reqInterceptor, resInterceptor]);

    return (
      <Fragment>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  }
}