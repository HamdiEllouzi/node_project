import { useEffect, useState } from "react";
import { getUserById } from "../service/service";
export default function Conversation({ conversation, curentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const frendId = conversation.members.find((v) => v !== curentUser._id);
    getUserById(frendId)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [conversation.members, curentUser._id]);

  return (
    <div className='conversation'>
      <img className='conversationImg' src={user?.userImage} alt='' />
      <span className='conversationName'>{user?.userFirstName + " " + user?.userLastName} </span>
    </div>
  );
}
