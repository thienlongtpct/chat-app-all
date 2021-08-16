import React, { useEffect, useState } from 'react';

const Room = () => {
    const [room, setRoom] = useState();
    useEffect(async () => {
        const getRoom = async () => {
            const response = await fetch('http://localhost:1337/rooms/61148527e60213deb8a1133c', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('auth')
                }
            });
            if (response.status === 200) setRoom(await response.json());
            console.log(response);
        };
        getRoom();
    }, []);
    if (!room) return <p>Can't get</p>;
    return (
        <>
            {room.messages.map((message) => (
                <p>{message.content}</p>
            ))}
        </>
    );
};

export default Room;
