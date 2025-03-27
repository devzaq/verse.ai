import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 bg-opacity-20 text-slate-600 py-16">
      {/* Increased padding and translucent grey background */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Half: Logo Area */}
        <Link href="/dashboard">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 via-fuchsia-500 to-fuchsia-800">
                verse.AI
              </p>
              <p className="text-sm">Empowering students with AI.</p>
            </div>
          </div>
        </Link>

        {/* Right Half: Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="text-sm">
              <li>AI Content</li>
              <li>AI Images</li>
              <li>SEO Tools</li>
              <li>Translation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Trends
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Communities
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Submit Tool
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="text-sm">
              <li>
                <a href="mailto:hello@verse.ai" className="hover:underline">
                  hello@verse.ai
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Follow on X
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>Copyright © Verse.ai. All rights reserved.</p>
        <div className="mt-2">
          <Link href="#" className="mr-4 hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
