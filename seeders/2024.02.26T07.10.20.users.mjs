import bcrypt from 'bcryptjs';

export const up = async ({ context: { sequelize } }) => {
  return sequelize.getQueryInterface().bulkInsert('users', [
    {
      name: 'Ahmad AbuDawaba',
      email: 'ahmedqss120@gmail.com',
      password: await bcrypt.hash('ggdsfg435d$%$#', 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'John',
      email: 'john@gmail.com',
      password: await bcrypt.hash('34df2$#fds', 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Mike',
      email: 'mike@gmail.com',
      password: await bcrypt.hash('fsdaf23*2#$@', 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Sara',
      email: 'sara@gmail.com',
      password: await bcrypt.hash('gfds342*2#$@', 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('users', null, {});
  return sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1;');
};
