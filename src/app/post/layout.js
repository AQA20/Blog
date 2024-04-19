import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function RootLayout({ children }) {
  return (
    <>
      <section>{children}</section>
      <section className="rounded-xl bg-light-surfaceContainerHigh outline-2 outline-light-outlineVariant px-6 py-4 my-4">
        <header>
          <h1>هل أعجبك المقال؟</h1>
        </header>
        <section>
          <p>اذا اعجبك المقال قم بمشاركته مع اصدقائك</p>
        </section>
        <footer className="my-4">
          <Button title="مشاركة" icon="/share-white.svg" />
        </footer>
      </section>
      <div className="my-4">
        <h3 className="text-lg">اقرأ أيضا</h3>
        <Badge title="الجميع" />
        <Badge title="شيء 1" />
        <Badge title="شيء 2" />
        <Badge title="شيء 3" />
        <Badge title="شيء 4" />
      </div>
      <section className="mt-4 flex flex-wrap md:flex-nowrap w-auto items-center gap-4">
        <section className="max-w-sm md:max-w-[320px]">
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isSmall={true}
            footer={true}
          />
        </section>
        <section className="max-w-sm md:max-w-[320px]">
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isSmall={true}
            footer={true}
          />
        </section>
      </section>
    </>
  );
}
