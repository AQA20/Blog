'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import Notification from '@/components/Notification';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    isShow: false,
    text: '',
    type: 'copy', // default type
  });

  const showNotification = useCallback((text, type = 'info') => {
    setNotification({ isShow: true, text, type });
  }, []);

  const hideNotification = () =>
    setNotification((prev) => ({ ...prev, isShow: false }));

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Notification
        isShow={notification.isShow}
        text={notification.text}
        type={notification.type}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
}

// Custom hook to use NotificationContext
export function useNotification() {
  return useContext(NotificationContext);
}
