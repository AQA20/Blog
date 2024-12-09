'use client';

import Tabs from '@/components/Tabs';
import TermOfUse from '@/components/TermOfUse';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import CookiesPolicy from '@/components/CookiesPolicy';
import { useSearchParams } from 'next/navigation';
import '@/components/Article/style.css';

const tabs = {
  'شروط الخدمة': <TermOfUse />,
  'سياسة الخصوصية': <PrivacyPolicy />,
  'سياسة الكوكيز': <CookiesPolicy />,
};

export default function Page() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const index = parseInt(params.get('index'));
  return <Tabs tabs={tabs} index={index} />;
}
