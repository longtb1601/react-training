import React, { useEffect, useState } from "react";
import axios from 'axios';

const ProfilePage = ({ currentUser }) => {
    const [profile, setProfile] = useState({
        name: '',
        id: '',
        createAt: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let didCancel = false;

        axios.get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${currentUser.userId}`).then(response => {
            if (!didCancel) {
                setProfile({
                    name: response.data.name,
                    id: response.data.id,
                    createAt: response.data.createAt
                });
                setIsLoading(false);
            }
        }).catch(() => {
            if (!didCancel) {
                setError(() => setError('Something went wrong'));
                setIsLoading(false)
            }
        });

        return () => didCancel = true;
    }, [currentUser.userId, currentUser.token]);

    if (isLoading) return (<div>Loading...</div>);

    if (error) return error;
    
    return (
        <div>
            <h3>Profile </h3>
            <div>Name: {profile.name}</div>
            <div>UserID: {profile.id}</div>
        </div>
    );
};

export default ProfilePage;
