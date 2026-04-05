import { useSearchParams, Link } from "react-router-dom";

const postsData = [
  { id: 1, title: "Вивчення React Router", body: "React Router — це стандартна бібліотека для маршрутизації в React." },
  { id: 2, title: "Новини JavaScript", body: "JavaScript продовжує розвиватися з новими можливостями ES2024." },
  { id: 3, title: "Що нового у Vite", body: "Vite 5 приносить ще швидшу розробку та покращену підтримку плагінів." },
  { id: 4, title: "Робота з URL параметрами", body: "useParams та useSearchParams — ключові хуки для динамічних додатків." },
];

const NewsFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";
  const sortOrder = searchParams.get("sort") || "asc";

  const handleSearchChange = (e) => {
    const text = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (text) {
      newParams.set("query", text);
    } else {
      newParams.delete("query");
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", sort);
    setSearchParams(newParams);
  };

  // 1. Фільтрація
  const filteredPosts = postsData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Сортування
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Стрічка новин (Практична №7)</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Пошук новин..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '8px', width: '250px' }}
        />
        
        <select value={sortOrder} onChange={handleSortChange} style={{ padding: '8px' }}>
          <option value="asc">Від А до Я</option>
          <option value="desc">Від Я до А</option>
        </select>
      </div>

      <div className="posts-list">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
              <h3>{post.title}</h3>
              <Link to={`/practice7/post/${post.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                Дивитися деталі &rarr;
              </Link>
            </div>
          ))
        ) : (
          <p>За вашим запитом "{searchQuery}" нічого не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;