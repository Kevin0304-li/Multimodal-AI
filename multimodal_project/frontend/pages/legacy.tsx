import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegacyPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the app router version
    router.push('/');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting to homepage...</h1>
        <p className="mt-2">Please wait while we redirect you to the main application.</p>
      </div>
    </div>
  );
} 