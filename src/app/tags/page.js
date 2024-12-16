import Tag from '@/components/Tag';
import { fetchTags } from '@/lib';
import moment from 'moment';

export async function generateMetadata() {
  const { tags } = await fetchTags();

  const title = 'اكتشف جميع الهاشتاغات | دليلك الشامل للمواضيع الأكثر شيوعًا';
  const description =
    'استعرض قائمة شاملة بجميع الهاشتاغات الأكثر تداولًا. اكتشف المواضيع المميزة المرتبطة بكل هاشتاغ، وابدأ رحلة معرفية مليئة بالمعلومات والأفكار الجديدة.';

  return {
    title,
    description,
    openGraph: {
      // Open Graph (OG) tags
      title,
      description,
      url: `${process.env.NEXT_JS_URL}/tags`,
      siteName: '500kalima',
      images: [
        {
          url: `${process.env.NEXT_JS_URL}/default-featured-img.png`,
          width: 940,
          height: 788,
        },
      ],
      locale: 'ar_AR',
      type: 'website',
    },
    // Other metadata
    canonicalUrl: `${process.env.NEXT_JS_URL}/tags`,
    author: 'Admin',
    publicationDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
    keywords: tags.map((tag) => tag.name).join(', '),
    language: 'ar',
  };
}

export default async function Page() {
  const { tags } = await fetchTags(16);
  return (
    <div className="mx-auto mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {tags.map((tag) => (
        <Tag key={tag.name} name={tag.name} />
      ))}
      {!tags.length && <p>لم يتم العثور على نتائج</p>}
    </div>
  );
}
