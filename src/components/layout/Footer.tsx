import { FaLinkedin } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import { routers } from "@/router/links";

function Footer() {
  return (
    <footer className="bg-[#fff]">
      <div className="mx-auto max-w-screen-lg space-y-8 px-8 py-8 sm:px-6 lg:space-y-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3 lg:pt-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#191919]">
              Contact Us
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <p className="text-xl font-bold mb-0 text-[#191919]">
                    Phone:
                  </p>
                  +90 (5XX) XXX XXXX
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <p className="text-xl font-bold mb-0 text-[#191919]">
                    Email:
                  </p>
                  gevenci.arif@gmail.com
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <p className="text-xl font-bold mb-0 text-[#191919]">
                    Address:
                  </p>
                  İzmir / GAZİEMİR
                </Link>
              </li>
            </ul>

            <p className="text-xl font-bold mt-6 mb-4 text-[#191919]">
              Follow us
            </p>
            <ul className="flex justify-start gap-4">
              <li>
                <Link
                  to="https://www.linkedin.com/in/gevenci"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <FaLinkedin size={20} />
                </Link>
              </li>
              <li>
                <Link
                  to="https://arifgevenci.com"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <IoShareSocial size={20} />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#191919]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4 text-sm">
              {routers.map((v, k) => (
                <li key={k}>
                  <Link to={v.url}>{v.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#191919]">
              Get in Touch
            </h3>

            <form className="max-w-sm mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  placeholder="Your name"
                  type="text"
                  id="text"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#000] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#000] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="desc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#000] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-center text-white bg-[#000] hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-[#000] dark:focus:ring-gray-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
