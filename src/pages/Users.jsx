import React, { useEffect, useState, useCallback } from 'react'
import {conf} from "../utils/config.js"
import axios from 'axios';
import {UserCard, ChangeApiLimitModal} from '../components/export.js'
import { useAuth } from '../context/authContext.jsx';

function Users() {

  const [users, setUsers] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [limitChangingUser, setLimitChangingUser] = useState(false);
  const [showApiLimitChanger, setShowApiLimitChanger] = useState(false);
  const {token} = useAuth();
  const [scrollableElement, setScrollableElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const loadUsers = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const url = nextCursor ? `${conf.serverBaseUrl}/api/v1/user?cursor=${encodeURIComponent(nextCursor)}&limit=${limit}` : `${conf.serverBaseUrl}/api/v1/user?limit=${limit}`;
    try {
      const res = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
      const data = res.data;
      setUsers((prev) => [...prev, ...data.users]);
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (error) {
      console.log("Something Went Wrong: ", error.message);
      console.log(error.stack);
    } finally {
      setLoading(false);
    }
  }, [nextCursor, token, limit, loading]);

  const showLimitChanger = (user) => {
    setShowApiLimitChanger(true);
    setLimitChangingUser(user);
  }

  const handleScroll = useCallback(() => {
    if (!scrollableElement || loading) return;
    const {scrollTop, scrollHeight, clientHeight} = scrollableElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasNext && !loading) {
      loadUsers();
    }
  }, [scrollableElement, hasNext, loadUsers, loading]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!scrollableElement) return;
    scrollableElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollableElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableElement, handleScroll]);

  return (
    <div
      className='flex flex-col h-full w-full overflow-y-scroll p-2 gap-2'
      ref={el => setScrollableElement(el)}
    >
      {
        users.map((user)=><UserCard name={user.name} bio={user.bio} email={user.email} profilePic={user.profilePic} apiPointsDailyLimit={user.apiPointsDailyLimit} key={user.email} onClickEvent={()=>showLimitChanger(user)}/>)
      }
      <ChangeApiLimitModal showApiLimitChanger={showApiLimitChanger} setShowApiLimitChanger={setShowApiLimitChanger} user={limitChangingUser}/>
    </div>
  )
}

export default Users