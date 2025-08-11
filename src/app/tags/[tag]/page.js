import Card from '@/components/Card';
import { fetchTagArticles, timeAgo } from '@/lib';
import Paginate from '@/components/Paginate';
import FilterBadges from '@/components/FilterBadges';
import moment from 'moment';


function normalizeOptions(searchParams) {
  return {
    orderBy: searchParams?.orderBy || 'createdAt',
    order: searchParams?.order || 'DESC',
    page: Number(searchParams?.page) || 1,
    search: searchParams?.search || '',
  };
}

async function getTagData(tag, searchParams) {
  const options = normalizeOptions(searchParams);
  return fetchTagArticles(tag, options);
}

export async function generateMetadata({ searchParams, params }) {
  const routeParams = await params;
  const urlSearchParams = await searchParams;
  const tag = routeParams?.tag.replace(/-/g, ' ').replace('#', '').trim();
  const { articles } = await getTagData(tag, urlSearchParams);;
  const title = `هاشتاغ #${tag} | اكتشف المواضيع المتعلقة بـ #${tag}`;
  const description = `تصفح جميع المقالات والمواضيع المرتبطة بـ #${tag}. محتوى مميز ومتنوع يغطي أحدث الاتجاهات والأفكار. اكتشف المزيد حول هذا الموضوع الآن!`;
  return {
    title,
    description,
    openGraph: {
      // Open Graph (OG) tags
      title,
      description,
      url: `${process.env.NEXT_JS_URL}/tags/${tag}?search=${tag}`,
      siteName: '500kalima',
      images: [
        {
          url:
            articles?.featuredImg ||
            `${process.env.NEXT_JS_URL}/default-featured-img.png`,
          width: 940,
          height: 788,
        },
      ],
      locale: 'ar_AR',
      type: 'website',
    },
    // Other metadata
    canonicalUrl: `${process.env.NEXT_JS_URL}/tags/${tag}?search=${tag}`,
    author: 'Admin',
    publicationDate: articles.length
      ? moment(articles[0].createdAt).format('MMMM Do YYYY, h:mm:ss a')
      : moment().format('MMMM Do YYYY, h:mm:ss a'),
    keywords: tag,
    language: 'ar',
  };
}

export default async function Page({ searchParams, params }) {
  const routeParams = await params;
  const urlSearchParams = await searchParams;
  const tag = routeParams?.tag.replace(/-/g, ' ').replace('#', '').trim();
  const { articles, totalPages } = await getTagData(tag, urlSearchParams);
  return (
    <div>
      {!articles.length && <p className="my-4">لم يتم العثور على نتائج</p>}
      <div className="my-2">
        <FilterBadges urlSearchParams={urlSearchParams} />
      </div>
      {articles.map((article) => (
        <Card
          key={article.id}
          id={article.id}
          slug={article.slug}
          title={article.title}
          description={article.description}
          imgUrl={article.featuredImg}
          tags={[{ name: article.tagName, id: article.tagId }]}
          timeAgo={timeAgo(article.createdAt)}
          width={180}
          height={120}
          animate={false}
        />
      ))}
      <Paginate pages={totalPages} />
    </div>
  );
}