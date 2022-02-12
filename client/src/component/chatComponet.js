import { useEffect, useState, useRef } from "react";
import "./chat.css";
import SendIcon from "@mui/icons-material/Send";
import Conversation from "./Conversation";
import Messages from "./Messages";
import ChatOnline from "./ChatOnline";
import {
  getConversation,
  getMessages,
  sendMessages,
  curentUser,
  newConversation,
  deleteConversation,
  searchUser,
} from "../service/service";
import { io } from "socket.io-client";
import ListeFrend from "./ListeFrend";

const ChatComponet = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const [search, setSearch] = useState("");
  const [searchListOfFrend, setSearchListOfFrend] = useState([]);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const wrapperRef = useRef(null);
  const socket = useRef();
  const ENDPOINT = "http://localhost:8000";

  useEffect(() => {
    socket.current = io(ENDPOINT);
    document.addEventListener("mousedown", handleClickOutside);
    fetchConversation();
    return () => {
      socket.current.disconnect();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (curentUser) {
      socket.current?.emit("addUser", curentUser._id, curentUser);
      socket.current?.on("listOfUsers", (listOfusers) => {
        setUsersOnline(listOfusers);
      });
      socket.current?.on("getMessage", (msg) => {
        setMessage([...message, msg]);
      });
      socket.current?.on("getRome", (rome) => {
        setConversation([...conversation, rome]);
      });
      socket.current?.on("romeDeleted", (rome) => {
        fetchConversation();
        if (rome._id === currentChat?._id) {
          setCurrentChat(null);
          setMessage([]);
        }
      });
    }
  }, [socket, message, conversation, currentChat]);

  useEffect(() => {
    currentChat &&
      getMessages(currentChat._id)
        .then((data) => {
          setMessage(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    search &&
      searchUser(search).then((freinds) => {
        setSearchListOfFrend(freinds);
      });
  }, [search]);
  const fetchConversation = () => {
    getConversation(curentUser?._id)
      .then((conver) => {
        setConversation(conver);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handelChange = (event) => {
    setNewMessage(event.target.value);
  };

  const onClick = () => {
    const reciverId = currentChat.members.find((member) => member !== curentUser._id);
    sendMessages(newMessage, currentChat._id)
      .then((data) => {
        setMessage([...message, data.msg]);
        setNewMessage("");
        socket.current.emit("sendMessage", data.msg, reciverId);
      })
      .catch((error) => console.error(error));
  };

  const creatChatRomm = (id) => {
    newConversation(id)
      .then((rome) => {
        setConversation([...conversation, rome]);
        setCurrentChat(rome);
        setSearch("");
        socket.current.emit("newRome", rome, id);
      })
      .catch((error) => {
        console.error(error.data);
      });
  };

  const removeConversation = (v) => {
    const reciverId = v.members.find((member) => member !== curentUser._id);
    deleteConversation(v._id)
      .then(() => {
        fetchConversation();
        setCurrentChat(null);
        setMessage([]);
        socket.current.emit("onDeleteRome", v, reciverId);
      })
      .catch((error) => console.error(error));
  };
  const findFrends = (e) => {
    setSearch(e.target.value);
  };
  function handleListKey(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick();
    }
  }
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSearch("");
    }
  }
  return (
    <div className='messanger'>
      <div className='chat-box-header'>TChat</div>
      <div className='chat-box-body'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <div className='searchFrends' ref={wrapperRef}>
              <input className='chatMenuInput' value={search} placeholder='Search for freinds' onChange={findFrends} />
              {search && (
                <div className='content-list' id='list'>
                  <ul className='drop-list'>
                    {searchListOfFrend.map((frend, i) => (
                      <div key={i} onClick={() => creatChatRomm(frend._id)}>
                        <ListeFrend frend={frend} />
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {conversation.map((v, i) => (
              <div key={i} className='conversation-list'>
                <div style={{ flexGrow: 1 }} onClick={() => setCurrentChat(v)}>
                  <Conversation conversation={v} curentUser={curentUser} />
                </div>
                <button className='btnDeleteConversation' onClick={() => removeConversation(v)}></button>
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatboxWrapper'>
            <div className='chat-logs'>
              {currentChat ? (
                message.map((v, i) => (
                  <div ref={scrollRef} key={i}>
                    <Messages me={v.sender === curentUser._id} message={v} />
                  </div>
                ))
              ) : (
                <span className='noConversationText'>Open a conversation to start a chat.</span>
              )}
            </div>
            <div className='chat-input-box'>
              <input
                id='chat-input'
                className='chat-input'
                onKeyDown={handleListKey}
                value={newMessage}
                placeholder='Send a message...'
                onChange={handelChange}
                disabled={currentChat ? false : true}
              />
              <button
                type='button'
                className='chat-submit'
                id='chat-submit'
                disabled={currentChat ? false : true}
                onClick={() => onClick()}>
                <SendIcon />{" "}
              </button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            {usersOnline.map(
              (user, index) =>
                user.userData._id !== curentUser._id && (
                  <div key={index} onClick={() => creatChatRomm(user.userData._id)}>
                    <ChatOnline user={user.userData} />
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponet;
