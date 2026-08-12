import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    onSearch(search.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <Search
          size={22}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-2xl border border-white/60 bg-white/90 py-4 pl-14 pr-5 text-base text-slate-800 shadow-lg outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-200/40"
        />
      </div>
    </form>
  );
};

export default SearchBar;