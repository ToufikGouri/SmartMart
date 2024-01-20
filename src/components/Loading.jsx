import React from 'react'
import LoadingSvg from '../Loading.svg'

const Loading = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img style={{height: "100px"}} src={LoadingSvg} alt="Loading..." />
        </div>
    )
}

export default Loading