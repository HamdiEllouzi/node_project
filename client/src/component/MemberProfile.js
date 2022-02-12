import { getDoc, doc, query, where, collection, getDocs } from '@firebase/firestore';
import React from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase-config';
import moment from 'moment'
function MemberProfile() {
    const parm = useParams()
    const userRef = doc(db, 'users', parm.id)
    const commentRef = collection(db, 'posts')
    const q = query(commentRef, where("userID", "==", parm.id))
    const [user, setUser] = React.useState({})
    const [comment, setComment] = React.useState([])
    React.useEffect(() => {
        const commentTable = []
        getDoc(userRef).then((e) => {
            setUser(e.data())
            getDocs(q).then((e) => {
                e.forEach(e => {
                    commentTable.push(e.data())
                })
            }).then(e => setComment(commentTable))
        })
        return null
    }, [q,userRef])
    return (
        <div className="user-profile-header">
            <div className="user-detail">
                <div className="user-image">
                    <img src={user.photoURL} alt='user' />
                </div>
                <div className="user-data">
                    <h2>{user.displayName}</h2>
                    <span className="post-label">User</span>
                    <p> Email :<strong>{user.email}</strong><br /></p>
                </div>
            </div>
            <div className='user_comment-list'>
                <h2>Publication de {user.displayName}</h2>
                {comment.map((v, i) =>
                    <div key={i} className='user_comment'>
                        <div><span className="post-label"><strong>{moment(v.publishDate).fromNow() }</strong></span></div>
                        {v.content}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemberProfile;
