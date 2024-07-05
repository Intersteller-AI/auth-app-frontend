'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

const useAuthRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(Cookies.get('user'));

  useEffect(() => {
    const checkUserCookie = () => {
      const newUser = Cookies.get('user');
      if (newUser !== user) {
        setUser(JSON.parse(newUser || ""));
      }
    };

    // Check cookie on component mount
    checkUserCookie();

    // Set an interval to check the cookie periodically
    const intervalId = setInterval(checkUserCookie, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  useEffect(() => {
    if (!user) {
      console.log('User not found, redirecting...');
      router.push(`/signin?next=${pathname}`);
    }
  }, [user, router, pathname]);

  return user;
};

export default useAuthRedirect;
