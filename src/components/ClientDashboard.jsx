import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';
import { v4 as uuidv4 } from 'uuid';

const ClientDashboard = ({ clientId }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate()

  const removeNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };
  

  useEffect(() => {
    // Set up Pusher
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });

    // Subscribe to the client's channel
    const clientChannel = pusher.subscribe(`client-${clientId}`);

    // Listen for new-subscriber events
    clientChannel.bind('new-exercise', (data) => {
      // Handle the new subscriber notification
      // Generate an id for each notification
      const notificationId = uuidv4();
      data.id = notificationId;
      // Update the notifications state with the new notification
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      pusher.unsubscribe(`client-${clientId}`);
    };
  }, [clientId]);

  return (
    <div>
      <div>
        <ul>
          {notifications.map((notification) => (
          <div key={notification.id} className="alert shadow-lg mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold">New notification!</h3>
              <div className="text-xs">{notification.message}</div>
            </div>
            <button className="btn btn-sm" onClick={() => navigate("/overview")}>See</button>
            <button className="btn btn-sm" onClick={() => removeNotification(notification.id)}>Close</button>
          </div>
          ))} 
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;