import Button from '@/components/Button';
import Link from 'next/link';
import { RiRadarLine } from '@remixicon/react';

export default function NotFound() {
  return (
    <section className="mt-52">
      <figure>
        <RiRadarLine size="40" className="fill-black" />
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
