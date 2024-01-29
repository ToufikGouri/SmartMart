import React, { useState } from 'react'
import { databases } from '../appwrite/appwriteConfig'
import { v4 as uuidv4 } from 'uuid'
import conf from '../appwrite/conf'
import Footer from '../components/Footer'
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
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <div className='fbParent text-center'>
                    <h4>How was your experience with the website, any Suggestions or Bug report? <br />Feel free to describe.</h4>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
                            <input type="text" required value={userDetails.uName} onChange={(e) => setUserDetails({ ...userDetails, uName: e.target.value })} placeholder='Your Name' className='my-2 fbInput' />
                            <textarea name="myText" required value={userDetails.uMsg} onChange={(e) => setUserDetails({ ...userDetails, uMsg: e.target.value })} cols="20" rows="4" placeholder='Describe Your Experience' className='my-2 fbInput' />

                            <div className='d-flex my-3'>
                                <input type="radio" name="check" required onChange={() => setUserDetails({ ...userDetails, uReason: 'Suggestions' })} id="Suggestions" className='mx-2' /><label htmlFor="Suggestions">Suggestions</label>
                                <input type="radio" name="check" onChange={() => setUserDetails({ ...userDetails, uReason: 'Bug' })} id="Bug" className='mx-2' /><label htmlFor="Bug">Bug</label>
                                <input type="radio" name="check" onChange={() => setUserDetails({ ...userDetails, uReason: 'Others' })} id="Others" className='mx-2' /><label htmlFor="Others">Others</label>
                            </div>

                            <button type='submit' className="btn btn-success my-3">Send Feedback</button>
                        </div>
                    </form>

                </div>

                <Footer />
            </div>
        </>
    )
}

export default FeedBack 