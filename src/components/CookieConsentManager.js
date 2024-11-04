'use client';

import { useEffect, useState } from 'react';
import CookiesDialog from './CookiesDialog';

const CookieConsentManager = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const isUseCookies = localStorage.getItem('useCookies');
    if (isUseCookies === null) {
      setShowDialog(true); // Show dialog if no consent
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('useCookies', true);
    setShowDialog(false); // Hide dialog after consent
  };

  return <>{showDialog && <CookiesDialog onAccept={handleAccept} />}</>;
};

export default CookieConsentManager;
