import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-cyan-600">404 - Page Not Found</h1>
      <p className="text-gray-600 my-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="underline text-blue-500 hover:underline"><h2>Go home</h2></Link>
    </div>
  );
};

export default NotFoundPage;