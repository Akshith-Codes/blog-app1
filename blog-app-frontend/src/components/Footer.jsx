function Footer() {
  return (
    <footer className="bg-[#1a1814] border-t border-[#2e2b25] mt-10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-[#5a5448] uppercase tracking-widest">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
        <div className="flex gap-5 text-xs">
          <a href="/" className="text-[#7a7060] hover:text-[#c9a84c] transition uppercase tracking-wider">Home</a>
          <a href="/articles" className="text-[#7a7060] hover:text-[#c9a84c] transition uppercase tracking-wider">Articles</a>
          <a href="/authors" className="text-[#7a7060] hover:text-[#c9a84c] transition uppercase tracking-wider">Authors</a>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;
 