import { PrismaClient, User } from '@prisma/client'
import dotenv from 'dotenv'
import faker from 'faker'

const prisma = new PrismaClient()

const fakeUser = (): User => ({
  id: faker.datatype.number(999),
  name: faker.name.firstName() + faker.name.lastName(),
  email: faker.internet.email()
})

const main = async () => {
  const fakerRounds = 10
  dotenv.config()
  console.log('Seeding...')

  /// USERS
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({ data: fakeUser() })
  }
}

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect()
})

