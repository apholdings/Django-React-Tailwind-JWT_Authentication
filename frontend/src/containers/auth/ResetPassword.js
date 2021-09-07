import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import Loader from 'react-loader-spinner';

import Header from '../../components/navigation/Header'
import Footer from '../../components/navigation/Footer'

const ResetPassword = ({ loading, reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent && !loading)
        return <Redirect to='/' />;

    return (
        <div>
            <Header/>
            

            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                    alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset password</h2>
                    
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={e => onSubmit(e)}>
                        <div>
                            <input
                                className='max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                                type='email'
                                placeholder='Your Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>

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
                                <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' type='submit'>
                                    Reset Password
                                </button>
                            )
                        }
                    </form>
                </div>
            </div>
            </div>

            <Footer/>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps, { reset_password })(ResetPassword);
