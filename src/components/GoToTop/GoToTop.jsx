import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function GoToTop() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const toggleVisibility = () => {
         if (window.scrollY > 300) setIsVisible(true);
         else setIsVisible(false);
      };

      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   return (
      isVisible && (
         <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-md transition duration-300 cursor-pointer"
            aria-label="Go to top"
         >
            <ArrowUp size={20} />
         </button>
      )
   );
}
