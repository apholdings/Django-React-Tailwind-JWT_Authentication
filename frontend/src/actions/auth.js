import axios from 'axios';
import { setAlert } from './alert';
// import {
//     get_items,
//     get_total,
//     get_item_total,
//     synch_cart
// } from './cart';
// import {
//     get_wishlist_items,
//     get_wishlist_item_total,
//     clear_wishlist,
// } from './wishlist';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGOUT
} from './types';

export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('We sent you an email, please activate your account', 'success'));
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error creating account', 'danger'));
        }

        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error creating account', 'danger'));
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Logged in successfully', 'success'));
            // dispatch(synch_cart());
            // dispatch(get_wishlist_items());
            // dispatch(get_wishlist_item_total());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error authenticating', 'danger'));
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error authenticating', 'danger'));
    }
};

export const google_authenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        dispatch({
            type: SET_AUTH_LOADING
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

            if (res.status === 201) {
                dispatch({
                    type: GOOGLE_AUTH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Logged in successfully', 'success'));
                // dispatch(synch_cart());
                // dispatch(get_wishlist_items());
                // dispatch(get_wishlist_item_total());
            } else {
                dispatch({
                    type: GOOGLE_AUTH_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Error authenticating', 'danger'));
            }
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error authenticating', 'danger'));
        }
    }
};

export const facebook_authenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        dispatch({
            type: SET_AUTH_LOADING
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

            if (res.status === 201) {
                dispatch({
                    type: FACEBOOK_AUTH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Logged in successfully', 'success'));
                // dispatch(synch_cart());
                // dispatch(get_wishlist_items());
                // dispatch(get_wishlist_item_total());
            } else {
                dispatch({
                    type: FACEBOOK_AUTH_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Error authenticating', 'danger'));
            }
        } catch (err) {
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error authenticating', 'danger'));
        }
    }
};

export const activate = (uid, token) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS
            });
            dispatch(setAlert('Successfully activated your Account', 'success'));
        } else {
            dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert('Error activating account', 'danger'));
        }

        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error creating account', 'danger'));
    }
};

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        if (res.status === 204) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Password reset email sent', 'success'));
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error sending password reset email', 'danger'));
        }
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error sending password reset email', 'danger'));
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });

    if (new_password !== re_new_password) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

            if (res.status === 204) {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCESS
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Password has been reset successfully', 'success'));
            } else {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Error resetting your password', 'danger'));
            }
        } catch (err) {
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error resetting your password', 'danger'));
        }
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Loggout Out', 'success'));
    // dispatch(get_items());
    // dispatch(get_item_total());
    // dispatch(get_total());
    // dispatch(clear_wishlist());
};
