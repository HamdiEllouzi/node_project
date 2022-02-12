import moment from "moment";

export default function Messages({ me, message }) {
  return (
    <div className='chat-block'>
      <div className={me ? "chat-msg self" : "chat-msg user"}>
        <span className='msg-avatar'>
          <img src={message.userImage} alt='profile img' />
        </span>
        <div className='cm-msg-text'>{message.msg}</div>
      </div>
      <div className='publishDate' style={me ? { marginLeft: "auto" } : { marginRight: "auto" }}>
        {moment(new Date(message.createdAt)).fromNow()}
      </div>
    </div>
  );
}
