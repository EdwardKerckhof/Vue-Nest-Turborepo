import { PrismaClient, User } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

let id = 1
const fakeUser = (): User => ({
  id,
  name: faker.name.firstName() + faker.name.lastName(),
  email: faker.internet.email()
})

const main = async () => {
  const fakerRounds = 10
  console.log('Seeding...')

  /// USERS
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({ data: fakeUser() })
    id++
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
