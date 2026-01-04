"use client";

import React from 'react';
import { usePlayChale } from './PlayChaleProvider';
import SearchModal from './SearchModal';
import PublicProfileModal from './PublicProfileModal';
import CompareModal from './CompareModal';

export default function GlobalModals() {
  const { 
    isSearchModalOpen, setIsSearchModalOpen,
    viewedProfile, setViewedProfile,
    comparingUser, setComparingUser,
    user, handleSearchProfile, handleSearchCompare, handleProfileCompare
  } = usePlayChale();

  return (
    <>
      {isSearchModalOpen && (
        <SearchModal 
          onClose={() => setIsSearchModalOpen(false)}
          onViewProfile={handleSearchProfile}
          onCompare={handleSearchCompare}
        />
      )}

      {viewedProfile && (
        <PublicProfileModal 
          user={viewedProfile}
          onClose={() => setViewedProfile(null)}
          onCompare={handleProfileCompare}
        />
      )}

      {comparingUser && (
        <CompareModal 
          userA={user}
          userB={comparingUser}
          onClose={() => setComparingUser(null)}
        />
      )}
    </>
  );
}
