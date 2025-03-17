import "@/styles/components/not-found.scss";

function NotFound() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="w-full flex flex-col md:flex-row items-center justify-center px-0 text-gray-700">
        <div className="max-w-md flex flex-wrap">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="pt-4 text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn't find this page.{" "}
          </p>
          <p className="mb-8 pt-4">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <a
            href="/"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150"
            title="Return Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Return Home</span>
          </a>
        </div>
        <div className="flex items-center justify-center max-w-lg hidden lg:flex">
          <img className="max-w-[50%]" src="/logo.png" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
