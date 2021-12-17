import { Post, PrismaClient, User } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

let id = 1
const fakeUser = (): User => ({
  id: id,
  name: faker.name.firstName() + faker.name.lastName(),
  email: faker.internet.email()
})
const fakePost = (): Post => ({
  id: id,
  title: faker.internet.userName(),
  content: faker.lorem.words(50),
  authorId: id,
  published: false
})

const main = async () => {
  const fakerRounds = 100

  console.log('Clearing data...')

  await prisma.post.deleteMany({ where: {} })
  await prisma.user.deleteMany({})

  console.log('Clearing complete!')

  console.log(`Seeding ${fakerRounds} users and posts...`)

  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({ data: fakeUser() })
    await prisma.post.create({ data: fakePost() })
    id++
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
