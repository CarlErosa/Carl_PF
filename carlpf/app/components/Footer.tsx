import { Github, Linkedin, Mail } from "lucide-react";
import RotatingText from "./ui/RotatingText";

export default function Footer() {
  return (
    <footer className="bg-[#c5d4c5] px-8 py-12 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-bold mb-4 text-[#334B35]">Like what you see?</h4>
            <div className="text-gray-700 flex items-center gap-2">
              <RotatingText
                texts={["Let's work together!", "Let's build something!", "Let's create magic!"]}
                mainClassName="bg-[#334B35] text-white px-2 py-0.5 rounded-lg overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#334B35]">Links</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/CarlErosa" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                <Github size={24} />
              </a>
              <a href="mailto:carlmelvinerosa3@gmail.com" className="text-gray-700 hover:text-gray-900">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
