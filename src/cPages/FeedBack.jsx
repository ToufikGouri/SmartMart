import React, { useState } from 'react'
import { databases } from '../appwrite/appwriteConfig'
import { v4 as uuidv4 } from 'uuid'
import conf from '../appwrite/conf'
import '../css/cPage.css'

const FeedBack = () => {

    const { appwriteDbId, appwriteDbClctIdFB } = conf;
    const [userDetails, setUserDetails] = useState({ uName: '', uMsg: '', uReason: '' })

    console.log(userDetails);

    const handleSubmit = (e) => {
        e.preventDefault()

        // Name, Msg, Reason

        const myData = { Name: userDetails.uName, Msg: userDetails.uMsg, Reason: userDetails.uReason }
        console.log(myData, "is my data");

        const promise = databases.createDocument(appwriteDbId, appwriteDbClctIdFB, uuidv4(), myData)

        promise.then(
            function (response) {
                console.log(response);
            },
            function (error) {
                console.log(error);
            }
        )

        setUserDetails({ uName: '', uMsg: '', uReason: '' });

    }

    return (
        <>
            <div className='fbParent text-center'>
                <h1>Feed Back Form</h1>
                <h4>How was your experience with the website, <br /> any Suggestions or Bug report ? <br /> Please feel free to describe.</h4>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='d-flex flex-column'>
                        <input type="text" required value={userDetails.uName} onChange={(e) => setUserDetails({ ...userDetails, uName: e.target.value })} placeholder='Your Name' className='my-2' />
                        <input type="text" required value={userDetails.uMsg} onChange={(e) => setUserDetails({ ...userDetails, uMsg: e.target.value })} placeholder='Describe Your Experience' className='my-2 p-5' />

                        <div className='fbReason'>
                            <input type="radio" name="check" required onChange={() => setUserDetails({ ...userDetails, uReason: 'Suggestions' })} id="Suggestions" className='mx-2' /><label htmlFor="Suggestions">Suggestions</label>
                            <input type="radio" name="check" onChange={() => setUserDetails({ ...userDetails, uReason: 'Bug' })} id="Bug" className='mx-2' /><label htmlFor="Bug">Bug</label>
                            <input type="radio" name="check" onChange={() => setUserDetails({ ...userDetails, uReason: 'Others' })} id="Others" className='mx-2' /><label htmlFor="Others">Others</label>
                        </div>

                        <button type='submit' className="btn btn-primary my-3">Send Feedback</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default FeedBack 