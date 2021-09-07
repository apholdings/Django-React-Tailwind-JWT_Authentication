import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { facebook_authenticate } from '../../actions/auth';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';

const Facebook = ({ facebook_authenticate }) => {
    const [redirect, setRediect] = useState(false);
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            const fetchData = async () => {
                await facebook_authenticate(state, code);
                setRediect(true);
            };

            fetchData();
        }
    }, [location]);

    if (redirect)
        return <Redirect to='/dashboard' />;
    return (
        <div className='mt-5 d-flex justify-content-center align-items-center'>
            <Loader
                type='Oval'
                color='#424242'
                height={50}
                width={50}
            />
        </div>
    );
};

export default connect(null, { facebook_authenticate })(Facebook);
