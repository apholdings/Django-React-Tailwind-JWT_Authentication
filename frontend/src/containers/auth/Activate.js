import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { activate } from '../../actions/auth';
import Loader from 'react-loader-spinner';

import Header from '../../components/navigation/Header'
import Footer from '../../components/navigation/Footer'

const Activate = ({ match, loading, activate }) => {
    const [activated, setActivated] = useState(false);

    const activate_account = () => {
        const uid = match.params.uid;
        const token = match.params.token;

        activate(uid, token);
        setActivated(true);
    };

    if (activated && !loading)
    return <Redirect to='/' />;

    return (
        <div>
            <Header/>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div 
                    className='max-w-3xl mx-auto'
                    style={{ marginTop: '200px' }}
                >
                    <h1>Activate your Account:</h1>
                    {
                        loading ? (
                            <div className='mt-3 d-flex justify-content-center align-items-center'>
                                <Loader
                                    type='Oval'
                                    color='#424242'
                                    height={50}
                                    width={50}
                                />
                            </div>
                        ) : (
                            <button
                                className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                style={{ marginTop: '50px' }}
                                type='button'
                                onClick={activate_account}
                            >
                                Activate
                            </button>
                        )
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
};

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps, {
    activate
})(Activate);
