import { Post, PrismaClient, User } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

let userId = 1
let postId = 1
const fakeUser = (): User => ({
  id: userId,
  name: faker.name.firstName() + faker.name.lastName(),
  email: faker.internet.email()
})
const fakePost = (): Post => ({
  id: postId,
  title: faker.internet.userName(),
  content: faker.lorem.words(50),
  authorId: userId,
  published: false
})

const main = async () => {
  const fakerRounds = 10

  console.log('Clearing data...')

  await prisma.post.deleteMany({ where: {} })
  await prisma.user.deleteMany({})

  console.log('Clearing complete!')

  console.log('Seeding...')

  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({ data: fakeUser() })
    await prisma.post.create({ data: fakePost() })
    userId++
    postId++
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
