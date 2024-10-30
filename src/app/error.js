'use client';

import ErrorWarningFill from '@/components/iconComponents/ErrorWarningFill';
import Button from '@/components/Button';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, []);
  return (
    <section className="mt-52">
      <figure>
        <ErrorWarningFill size="40" className="fill-light-error" />
      </figure>
      <section className="my-4">
        <header>
          <h1 className="text-light-error">حدث خطأ ما</h1>
        </header>
        <section>
          <p className="text-light-error">{error.message}</p>
        </section>
      </section>
      <Button onClick={reset} title="إعادة المحاولة"></Button>
    </section>
  );
}
