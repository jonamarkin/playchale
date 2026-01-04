"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { usePlayChale } from '@/components/PlayChaleProvider';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = usePlayChale();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/profile');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <LandingPage onGetStarted={() => setIsLoggedIn(true)} />;
  }

  return null;
}
