export default function ChatOnline({ user }) {
  return (
    <div className='chatOnline'>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img className='chatOnlineImg' src={user?.userImage} alt='' />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'>{user?.userFirstName + " " + user?.userLastName}</span>
      </div>
    </div>
  );
}
