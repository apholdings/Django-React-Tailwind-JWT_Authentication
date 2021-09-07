import {Fragment} from 'react'
import {connect} from 'react-redux'

import { CheckCircleIcon, XIcon } from '@heroicons/react/solid'


function Alert ({ alert }) {
    const displayAlert = () => {
        if (alert !== null){
            return (
                <div className={`rounded-md bg-${alert.alertType}-50 p-4`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                    <CheckCircleIcon className={`h-5 w-5 text-${alert.alertType}-400`} aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <p className={`text-sm font-medium text-${alert.alertType}-800`}>{alert.msg}</p>
                    </div>
                    <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                        type="button"
                        className={`inline-flex bg-${alert.alertType}-50 rounded-md p-1.5 text-${alert.alertType}-500 hover:bg-${alert.alertType}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${alert.alertType}-50 focus:ring-${alert.alertType}-600`}
                        >
                        <span className="sr-only">Dismiss</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )
        } else {
            return(
                <Fragment></Fragment>
            )
        }
    }

    return (
        <Fragment>
            {displayAlert()}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alert: state.alert.alert
})

export default connect(mapStateToProps)(Alert)