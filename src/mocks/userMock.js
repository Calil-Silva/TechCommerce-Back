import faker from 'faker';
import bcrypt from 'bcrypt';

export const mockedUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: `${faker.internet.password(8)}!`,
  selectedCountry: faker.address.country,
  birthDate: faker.date.past(),
  confirmedPassword() {
    return this.password;
  },
  fakePassword() {
    return this.password.slice(1);
  },
  hashedPassword() {
    return bcrypt.hashSync(this.password, 10);
  },
};
