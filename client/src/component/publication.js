import React from 'react';
import './Publication.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Post from './Post';
import CloseIcon from '@mui/icons-material/Close';
import { axiosReq, deletePost, setComment, setLikeDislike, setPost } from '../service/service';
const Publication = () => {
  const [likeStatus, setLikeStatus] = React.useState(false);
  const [addPublication, setAddPublication] = React.useState(false);
  const [fireData, setFireData] = React.useState([]);
  React.useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = () => {
    axiosReq
      .get('/api/posts')
      .then((data) => setFireData(data.data))
      .catch();
  };
  const addLike = (postId) => {
    setLikeDislike(postId)
      .then((data) => {
        fetchPost();
      })
      .catch((error) => {});
    setLikeStatus(!likeStatus);
  };
  const addPost = (content) => {
    const post = {
      postContent: content,
    };
    setPost(post).then((e) => {
      handleModal();
      fetchPost();
    });
  };
  const addComment = (id, comment) => {
    setComment(id, comment).then((e) => {
      fetchPost();
    });
  };
  const onDeletePost = (id) => {
    deletePost(id).then(() => {
      fetchPost();
    });
  };
  const handleModal = (_) => setAddPublication(!addPublication);
  return (
    <div className='post_page'>
      <div className='add_container'>
        <button className='add_button' onClick={handleModal}>
          <AddCircleOutlineIcon fontSize='large' />
        </button>
      </div>
      <div className='post_content'>
        {fireData.map((v, i) => (
          <Post
            key={i}
            addComment={addComment}
            deletePost={onDeletePost}
            post={v}
            addLike={addLike}
            like={likeStatus}
          />
        ))}
      </div>
      {addPublication && (
        <AddPublication title='New Publication' buttonText='Post Publication' close={handleModal} onSubmit={addPost} />
      )}
    </div>
  );
};

export const AddPublication = ({ title, buttonText, close, onSubmit }) => {
  const [content, setContent] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(content);
    setContent('');
  };
  const handleTextChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <div className='addPublication_contnair'>
      <span className='close' onClick={close}>
        {' '}
        <CloseIcon />
      </span>
      <form className='createComment' onSubmit={handleSubmit}>
        <h1>{title}</h1>
        <textarea
          type='text'
          className='input_publication'
          placeholder='Publication'
          value={content}
          onChange={handleTextChange}
          required
        />
        <button className='post_button ' type='submit'>
          {buttonText}
        </button>
      </form>
    </div>
  );
};
export default Publication;
