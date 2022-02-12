import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getComment } from '../service/service';

const Post = ({ deletePost, addComment, post, addLike }) => {
  const currentUser = JSON.parse(localStorage.getItem('User'));
  React.useEffect(() => {
    setLikeStatus(post.like.includes(currentUser._id));
  }, [currentUser, post]);
  const [listOfComments, setListOfComments] = React.useState([]);
  const [likeStatus, setLikeStatus] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const handleShowComments = (id) => {
    getComment(id)
      .then((data) => {
        setListOfComments(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
    setShowComments(!showComments);
  };
  const handleClick = (event) => {
    event.preventDefault();
    addComment(post._id, comment);
    setComment('');
  };
  const handleChange = (event) => setComment(event.target.value);
  return (
    <div className='commentBox'>
      <div className='post'>
        <div className='postBody'>
          <img src={post.userPhoto} className='postPic' alt='user Pic' />
          <div className='postContent'>
            <div className='postHeader'>
              <h2 className='postAuthor' id={post.userId}>
                <Link to={`/${post.userId}`}> {post.userName}</Link>
              </h2>
              <span className='publishDate'>{moment(new Date(post.publishDate)).fromNow()}</span>
              {post.userId.toString() === currentUser._id && (
                <span style={{ marginLeft: 'auto' }}>
                  <button onClick={() => deletePost(post._id)} style={{ color: 'red' }} className='like_button'>
                    <DeleteIcon />
                  </button>
                </span>
              )}
            </div>
            <span className='postText'>{post.postContent}</span>
            <div className='postDesc'>
              <span className='desc'>
                {likeStatus ? (
                  <button className='like_button' onClick={() => addLike(post._id)}>
                    <ThumbUpIcon />
                  </button>
                ) : (
                  <button className='like_button' onClick={() => addLike(post._id)}>
                    <FavoriteBorderIcon />
                  </button>
                )}
                <span>{post.likeNumber} </span>
                Likes
              </span>
              <span className='desc'>
                <button className='like_button' onClick={() => handleShowComments(post._id)}>
                  <ChatBubbleOutlineOutlinedIcon />
                </button>
                <span>{post.commentsNumber}</span> Comments
              </span>
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <div>
          <form className='createComment'>
            <h5 style={{ color: 'white' }}>your comment</h5>
            <textarea
              id='comment'
              type='text'
              name='comment'
              placeholder='Comment'
              value={comment}
              onChange={handleChange}
              className='input_comment'
              required
            />
            <button onClick={handleClick} className='btn_comment'>
              Send
            </button>
          </form>
          {listOfComments.map((v, i) => (
            <Comment key={i} commentInfo={v} />
          ))}
        </div>
      )}
    </div>
  );
};

const Comment = ({ commentInfo }) => (
  <div className='comment'>
    <img src={commentInfo.userImage} className='commentPic' alt='user Pic' />
    <div className='commentBody'>
      <div className='commentHeader'>
        <h3 className='commentAuthor'>{commentInfo.userName}</h3>
        <span className='publishDate'>{moment(new Date(commentInfo.date)).fromNow()}</span>
      </div>
      <span className='commentContent'>{commentInfo.comment}</span>
    </div>
  </div>
);
export default Post;
