import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Button from '@/components/Button';
import SwapIt from '@/components/SwapIt';

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
      <div className="my-4 whitespace-nowrap">
        <h3 className="text-lg">اقرأ أيضا</h3>
        <section className="sm:hidden">
          <SwapIt slidesPerView={4.2}>
            <Badge title="الجميع" />
            <Badge title="شيء 1" />
            <Badge title="شيء 2" />
            <Badge title="شيء 3" />
            <Badge title="شيء 4" />
            <Badge title="شيء 5" />
            <Badge title="شيء 6" />
          </SwapIt>
        </section>
        <section className="hidden sm:block">
          <Badge title="الجميع" />
          <Badge title="شيء 1" />
          <Badge title="شيء 2" />
          <Badge title="شيء 3" />
          <Badge title="شيء 4" />
          <Badge title="شيء 5" />
          <Badge title="شيء 6" />
        </section>
      </div>

      <section className="hidden sm:flex mt-4 items-center gap-4">
        <section>
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isXSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isXSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isXSmall={true}
            footer={true}
          />
        </section>
        <section>
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isXSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isXSmall={true}
            footer={true}
          />
          <Card
            title="كيف اصبح الدكتور فيلسوف"
            description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
            tags={['كن', 'كان', 'يكن']}
            image={'/sidebar-demo.png'}
            isXSmall={true}
            footer={true}
          />
        </section>
      </section>
      <section className="sm:hidden  mt-4 items-center gap-4">
        <SwapIt slidesPerView={1.2}>
          <section className="ml-8">
            <Card
              title="كيف اصبح الدكتور فيلسوف"
              description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
              tags={['كن', 'كان', 'يكن']}
              image={'/sidebar-demo.png'}
              isXSmall={true}
              footer={true}
            />
            <Card
              title="كيف اصبح الدكتور فيلسوف"
              description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
              tags={['كن', 'كان', 'يكن']}
              image={'/sidebar-demo.png'}
              isXSmall={true}
              footer={true}
            />
            <Card
              title="كيف اصبح الدكتور فيلسوف"
              description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
              tags={['كن', 'كان', 'يكن']}
              image={'/sidebar-demo.png'}
              isXSmall={true}
              footer={true}
            />
          </section>
          <section>
            <Card
              title="كيف اصبح الدكتور فيلسوف"
              description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
              tags={['كن', 'كان', 'يكن']}
              image={'/sidebar-demo.png'}
              isXSmall={true}
              footer={true}
            />
            <Card
              title="كيف اصبح الدكتور فيلسوف"
              description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
              tags={['كن', 'كان', 'يكن']}
              image={'/sidebar-demo.png'}
              isXSmall={true}
              footer={true}
            />
            <Card
              title="كيف اصبح الدكتور فيلسوف"
              description=" تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها
تخيل ان تكون طبيبا فتسيقظ لتصبح فيلسوفا فاجأة وبين ليلة وضحاها"
              tags={['كن', 'كان', 'يكن']}
              image={'/sidebar-demo.png'}
              isXSmall={true}
              footer={true}
            />
          </section>
        </SwapIt>
      </section>
    </>
  );
}
