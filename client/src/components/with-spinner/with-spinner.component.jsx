import React from 'react';

import Spinner from '../spinner/spinner.components';

const withSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <Spinner />
    ) : (
        <WrappedComponent {...otherProps} />
        );
    };

export default withSpinner;