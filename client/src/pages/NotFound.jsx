import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: 'Page Not Found | Car Loans & Sales',
    description: 'The page you are looking for does not exist.',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">404</h1>
        <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
