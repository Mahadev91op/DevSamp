"use client"; // Isse Client Component banana zaroori hai

import dynamic from 'next/dynamic';

// Heavy components ko yahan lazy load karein (ssr: false allowed here)
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const ProgressBar = dynamic(() => import('./ProgressBar'), { ssr: false });
const WhatsAppBtn = dynamic(() => import('./WhatsAppBtn'), { ssr: false });
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

export default function ClientFeatures() {
  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <WhatsAppBtn />
      <Chatbot />
    </>
  );
}