import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { UserCard } from '../components/export.js';
import UserProjectsModal from '../components/UserProjectsModal.jsx';
import { useAuth } from '../context/authContext.jsx';
import { conf } from '../utils/config.js';
import { themeColors } from '../constants/classes.js';

function Users() {
    const [users, setUsers] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const limit = 10;
    const [scrollableElement, setScrollableElement] = useState(null);

    const loadUsers = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        const url = nextCursor ? `${conf.serverBaseUrl}/api/v1/user?cursor=${encodeURIComponent(nextCursor)}&limit=${limit}` : `${conf.serverBaseUrl}/api/v1/user?limit=${limit}`;
        try {
            const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            const data = res.data;
            setUsers((prev) => [...prev, ...data.users]);
            setNextCursor(data.nextCursor);
            setHasNext(data.hasNext);
        } catch (error) {
            console.log("Something Went Wrong: ", error.message);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    }, [nextCursor, token, limit, loading]);

    useEffect(() => {
        loadUsers();
    }, []);

    const handleScroll = useCallback(() => {
        if (!scrollableElement || loading) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && hasNext && !loading) {
            loadUsers();
        }
    }, [scrollableElement, hasNext, loadUsers, loading]);

    useEffect(() => {
        if (!scrollableElement) return;
        scrollableElement.addEventListener("scroll", handleScroll);
        return () => {
            scrollableElement.removeEventListener("scroll", handleScroll);
        };
    }, [scrollableElement, handleScroll]);

    return (
        <div className="h-full flex flex-col">
            <h1 className={`text-2xl font-bold mb-4 ${themeColors.text}`}>Manage Users</h1>
            <div
                className='flex flex-col h-full w-full overflow-y-auto p-4 gap-4' // Added gap and padding
                ref={el => setScrollableElement(el)}
            >
                {users.map((user) => (
                    <UserCard
                        key={user.email}
                        name={user.name}
                        bio={user.bio}
                        email={user.email}
                        profilePic={user.profilePic}
                        onSeeProjects={() => setSelectedUser(user)}
                    />
                ))}
                {loading && <p className={`text-center p-2 ${themeColors.secondary}`}>Loading...</p>}
            </div>

            {selectedUser && (
                <UserProjectsModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}

export default Users;
