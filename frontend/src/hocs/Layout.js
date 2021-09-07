import { connect } from 'react-redux';
import {check_authenticated, load_user, refresh} from '../actions/auth'
import { useEffect } from 'react'

function Layout(props){
    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
    }, []);

    return(
        <div>
            
            {props.children}
            
        </div>
    );
};

export default connect(null, {
    check_authenticated,
    load_user,
    refresh
}) (Layout);