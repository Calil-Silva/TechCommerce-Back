import faker from 'faker';
import bcrypt from 'bcrypt';

export const mockedUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  fakePassword() {
    return this.password.slice(1);
  },
  hashedPassword() {
    return bcrypt.hashSync(this.password, 10);










    
  },
};
