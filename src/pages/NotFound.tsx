import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white text-center">
        Page Not Found
      </h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button>
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;