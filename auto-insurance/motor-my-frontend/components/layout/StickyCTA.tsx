'use client';

import React from 'react';

interface StickyCTAProps {
  children: React.ReactNode;
  show?: boolean;
}

export function StickyCTA({ children, show = true }: StickyCTAProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40 shadow-lg">
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
}