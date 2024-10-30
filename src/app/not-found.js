import Button from '@/components/Button';
import Link from 'next/link';
import ReplyLine from '@/components/iconComponents/ReplyLine';

export default function NotFound() {
  return (
    <section className="mt-52">
      <figure>
        <ReplyLine size="40" className="fill-black dark:fill-dark-onSurface" />
      </figure>
      <section className="my-4">
        <header>
          <h1>هذه الصفحة غير موجودة!</h1>
        </header>
        <section>
          <p>لا تقلق، إنه ليس خطأك بل خطأ 404</p>
        </section>
      </section>
      <Link href="/">
        <Button title="الى الصفحة الرئيسية"></Button>
      </Link>
    </section>
  );
}
