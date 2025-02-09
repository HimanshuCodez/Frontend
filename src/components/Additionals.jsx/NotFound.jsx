import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <img 
        src="https://imgs.search.brave.com/acVt0jpKZYTvNrRU_F_tjGEQmn8RW1J13XYlN9_LiXs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzQ3LzQwLzE3/LzM2MF9GXzEwNDc0/MDE3NDNfRTFBbXlV/NnNtM05xWXVMYlc2/bnlESE9BQVpJNEdv/dVUuanBn" 
        alt="404 Not Found" 
        className="w-80 md:w-96 lg:w-[500px] mb-6"
      />
      <h1 className="text-4xl font-bold text-red-600">Oops! Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
