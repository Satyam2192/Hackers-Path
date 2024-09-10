import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from './Modal'; 

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowModal(true); // Show modal if not authenticated
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="You must log in to continue"
        description="Please log in to access this content."
        button1Action={()=>router.push("/login")}
        button1description="Log In"
        button2Action={()=>router.push("/register")}
        button2description="Sign Up"

        
      />
    </>
  );
};

export default AuthWrapper;
