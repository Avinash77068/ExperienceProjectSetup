import ShayriCard from "./ShayriCard";
import Header from "./Header";
import Pagination from "./Pagination";
import { FiHome, FiSettings } from "react-icons/fi";

export default function PublicShayriView({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filteredPosts,
  copiedId,
  likes,
  onCopy,
  onLike,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "About", path: "/about" },
  ];

  const handleNavigationClick = (item) => {
    console.log("Navigate to:", item.path);
  };

  const handleUserAction = (action) => {
    if (action.action === "admin") {
      window.location.hash = "#admin";
    }
  };

  const user = {
    name: "Guest",
    actions: [{ label: "Admin Panel", icon: FiSettings, action: "admin" }],
  };

  return (
    <>
      <Header
        title="Rooh-e-Shayri"
        subtitle="Alfaaz ki Mehfil - Ishq, dard aur zindagi ke ehsaas"
        navigationItems={navigationItems}
        user={user}
        onNavigationClick={handleNavigationClick}
        onUserAction={handleUserAction}
        className="bg-[#0a0a0f] text-white border-amber-300/20"
      />

      <main className="min-h-screen bg-[#0a0a0f] px-4 py-8 text-zinc-100">
        <div className="mx-auto max-w-7xl">
          <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-amber-300 bg-amber-300 text-zinc-950"
                        : "border-zinc-700 text-zinc-300 hover:border-amber-300/70 hover:text-amber-100"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search shayri, author, category..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 md:w-80 focus:border-amber-300 focus:outline-none"
            />
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPosts.map((post) => (
              <ShayriCard
                key={post.id}
                post={post}
                copiedId={copiedId}
                likeCount={likes[post.id] ?? 0}
                onCopy={onCopy}
                onLike={onLike}
              />
            ))}
          </section>

          {filteredPosts.length === 0 && (
            <p className="mt-10 text-center text-zinc-400">
              Koi shayri nahi mili. Dusra keyword try karein.
            </p>
          )}
          
          {filteredPosts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              className="mt-8"
            />
          )}
        </div>
      </main>
    </>
  );
}
