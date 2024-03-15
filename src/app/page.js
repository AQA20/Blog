export default async function Home() {
  const res = await fetch(`http://localhost:8080/api/articles`);
  const data = await res.json();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {data.data.map((article, i) => {
          return <h1 key={i}>{article.title}</h1>;
        })}
      </div>
    </main>
  );
}
