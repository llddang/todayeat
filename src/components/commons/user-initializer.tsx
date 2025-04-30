'use client';

import { initializeAuthListener } from '@/store/user.store';
import { useEffect } from 'react';

const UserInitialize = () => {
  useEffect(() => {
    initializeAuthListener();
  });
  return null;
};
export default UserInitialize;
