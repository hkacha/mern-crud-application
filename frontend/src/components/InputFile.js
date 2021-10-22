import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classNames from 'classnames';

const InputFile = () => {
    return (
        <div>
            
        </div>
    )
}

const propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string)
}

export default InputFile
