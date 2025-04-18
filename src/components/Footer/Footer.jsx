import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
   const posts = useSelector((state) => state.post.posts);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-gray-100 border-t border-gray-300 text-gray-700 py-12">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Branding */}
            <div className="flex flex-col gap-4">
               <Logo width="120px" />
               <p className="text-sm">Mind Nibbles — Daily bytes of learning</p>
               <p className="text-xs text-gray-600">
                  &copy; {currentYear} Mind Nibbles. All rights reserved. <br />
                  Built by{" "}
                  <a
                     href="https://saadjawed.vercel.app"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline"
                  >
                     Saad Jawed
                  </a>
               </p>
            </div>

            {/* Recent Posts */}
            <div>
               <h4 className="text-sm font-semibold uppercase mb-4">Latest Posts</h4>
               <ul className="flex flex-col gap-2 text-sm">
                  {posts.slice(0, 5).map((post) => (
                     <li key={post.$id}>
                        <Link
                           to={`/post/${post.$id}`}
                           className="hover:text-black hover:underline line-clamp-1"
                        >
                           {post.title}
                        </Link>
                     </li>
                  ))}
                  <li>
                     <Link to="/" className="text-blue-600 text-sm hover:underline">
                        See all posts →
                     </Link>
                  </li>
               </ul>
            </div>

            {/* Socials + Back to Top + Newsletter */}
            <div className="flex flex-col gap-4">
               {/* Social Links */}
               <div>
                  <h4 className="text-sm font-semibold uppercase mb-2">Follow Me</h4>
                  <div className="flex justify-center gap-3">
                     <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        {/* <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />  */}
                        🐦
                     </a>
                     <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        {/* <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" /> */}
                        💻
                     </a>
                     <a href="https://github.com" target="_blank" rel="noreferrer">
                        {/* <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" /> */}
                        ✉️
                     </a>
                  </div>
               </div>

               {/* Newsletter */}
               <div>
                  <h4 className="text-sm font-semibold uppercase mb-2">Subscribe</h4>
                  <form
                     onSubmit={(e) => {
                        e.preventDefault();
                        alert("Thanks for subscribing!");
                     }}
                     className="flex gap-2"
                  >
                     <input
                        type="email"
                        placeholder="Your email"
                        required
                        className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                     >
                        Subscribe
                     </button>
                  </form>
               </div>

               {/* Back to Top */}
               <button
                  onClick={scrollToTop}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
               >
                  ↑ Back to top
               </button>
            </div>
         </div>
      </footer>
   );
};

export default Footer;

// VARIANT # 02

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";
// import Logo from "../Logo/Logo";
// import { useSelector } from "react-redux"; 

// const Footer = () => {
//    const [email, setEmail] = useState("");

//    const posts = useSelector(state => state.post.posts);

//    const scrollToTop = () => {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//    };

//    return (
//       <footer className="bg-gray-100 border-t border-gray-200 py-12 text-gray-700">
//          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
//             {/* Branding Section */}
//             <div>
//                <div className="mb-4">
//                   <Logo width="120px" />
//                   <p className="mt-2 text-sm text-gray-600">
//                      Daily bytes of learning and growth.
//                   </p>
//                </div>
//                <p className="text-xs text-gray-500">
//                   &copy; {new Date().getFullYear()} Mind Nibbles. Built by{" "}
//                   <a
//                      href="https://saadjawed.vercel.app"
//                      target="_blank"
//                      rel="noopener noreferrer"
//                      className="underline hover:text-black"
//                   >
//                      Saad Jawed
//                   </a>
//                   .
//                </p>
//             </div>

//             {/* Recent Blog Posts */}
//             <div>
//                <h4 className="text-sm font-semibold mb-4 uppercase text-gray-500">
//                   Recent Posts
//                </h4>
//                <ul className="space-y-2">
//                   {posts.map((post) => (
//                      <li key={post.$id}>
//                         <Link
//                            to={`/post/${post.$id}`}
//                            className="text-base text-gray-700 hover:text-black hover:underline"
//                         >
//                            {post.title.length > 40
//                               ? post.title.slice(0, 40) + "..."
//                               : post.title}
//                         </Link>
//                      </li>
//                   ))}
//                </ul>
//             </div>

//             {/* Newsletter + Socials + Scroll Top */}
//             <div>
//                <h4 className="text-sm font-semibold mb-4 uppercase text-gray-500">
//                   Stay Connected
//                </h4>
//                <form
//                   onSubmit={(e) => {
//                      e.preventDefault();
//                      setEmail("");
//                      alert("Subscribed!");
//                   }}
//                   className="flex items-center mb-4"
//                >
//                   <input
//                      type="email"
//                      placeholder="Your email"
//                      value={email}
//                      onChange={(e) => setEmail(e.target.value)}
//                      className="w-full px-4 py-2 border rounded-l-md focus:outline-none"
//                      required
//                   />
//                   <button
//                      type="submit"
//                      className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 cursor-pointer"
//                   >
//                      Subscribe
//                   </button>
//                </form>

//                <div className="flex items-center justify-center gap-4 mb-4">
//                   <a
//                      href="https://twitter.com/yourhandle"
//                      className="text-gray-600 hover:text-black"
//                      aria-label="Twitter"
//                   >
//                      🐦
//                   </a>
//                   <a
//                      href="https://github.com/yourhandle"
//                      className="text-gray-600 hover:text-black"
//                      aria-label="GitHub"
//                   >
//                      🐙
//                   </a>
//                   <a
//                      href="https://linkedin.com/in/yourhandle"
//                      className="text-gray-600 hover:text-black"
//                      aria-label="LinkedIn"
//                   >
//                      💼
//                   </a>
//                </div>

//                <button
//                   onClick={scrollToTop}
//                   className="text-sm text-gray-500 hover:text-black underline"
//                >
//                   Back to Top ↑
//                </button>
//             </div>
//          </div>
//       </footer>
//    );
// };

// export default Footer;

// VARIANT # 03

// import React from "react";
// import { Link } from "react-router";
// import Logo from "../Logo/Logo";

// const Footer = () => {
//    const year = new Date().getFullYear();

//    return (
//       <footer className="w-full relative overflow-hidden py-10 bg-zinc-100 text-[var(--reseda-green)]">
//             <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                {/* Logo & Slogan */}
//                <div>
//                   <div className="mb-4">
//                      <Logo width="120px" />
//                   </div>
//                   <p className="text-sm text-gray-400">
//                      Daily bites of wisdom & inspiration. Learn something new every day.
//                   </p>
//                   <p className="mt-4 text-xs text-gray-500">
//                      &copy; {year} Mind Nibbles. All rights reserved.
//                   </p>
//                </div>

//                {/* Company */}
//                <div>
//                   <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
//                      Company
//                   </h3>
//                   <ul className="space-y-2">
//                      <li><Link to="/" className="hover:underline">Features</Link></li>
//                      <li><Link to="/" className="hover:underline">Pricing</Link></li>
//                      <li><Link to="/" className="hover:underline">Affiliate Program</Link></li>
//                      <li><Link to="/" className="hover:underline">Press Kit</Link></li>
//                   </ul>
//                </div>

//                {/* Support */}
//                <div>
//                   <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
//                      Support
//                   </h3>
//                   <ul className="space-y-2">
//                      <li><Link to="/" className="hover:underline">Account</Link></li>
//                      <li><Link to="/" className="hover:underline">Help</Link></li>
//                      <li><Link to="/" className="hover:underline">Contact Us</Link></li>
//                      <li><Link to="/" className="hover:underline">Customer Support</Link></li>
//                   </ul>
//                </div>

//                {/* Legal & Social */}
//                <div>
//                   <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
//                      Legal
//                   </h3>
//                   <ul className="space-y-2">
//                      <li><Link to="/" className="hover:underline">Terms & Conditions</Link></li>
//                      <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
//                      <li><Link to="/" className="hover:underline">Licensing</Link></li>
//                   </ul>

//                   <div className="mt-6 flex space-x-4">
//                      {/* Replace with actual links or social icons */}
//                      <a href="#" aria-label="Twitter" className="hover:text-white">🐦</a>
//                      <a href="#" aria-label="GitHub" className="hover:text-white">💻</a>
//                      <a href="#" aria-label="Email" className="hover:text-white">✉️</a>
//                   </div>
//                </div>
//             </div>
//       </footer>
//    );
// };

// export default Footer;
