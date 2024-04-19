import Card from './Card';
import Badge from './Badge';

const Sidebar = () => {
  return (
    <article className="w-[344px] mr-12 pr-2 sticky top-0 py-2">
      <header>
        <h2 className="mb-4 mt-2">الأكثر قراءة</h2>
      </header>
      <section>
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
      <h2 className="mb-2">أشهر المواضيع</h2>
      <footer className="flex flex-wrap">
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
        <Badge title="عيد الفطر" />
      </footer>
    </article>
  );
};

export default Sidebar;
