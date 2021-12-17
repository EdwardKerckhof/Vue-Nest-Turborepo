import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

class BaseArgs {
  @ApiProperty({ required: false })
  take?: number

  @ApiProperty({ required: false })
  skip?: number
}

export class FindAllUsersArgs extends BaseArgs {
  @ApiProperty({ required: false })
  cursor?: Prisma.UserWhereUniqueInput

  @ApiProperty({ required: false })
  where?: Prisma.UserWhereInput

  @ApiProperty({ required: false })
  orderBy?: Prisma.UserOrderByWithRelationInput
}

export class FindAllPostsArgs extends BaseArgs {
  @ApiProperty({ required: false })
  cursor?: Prisma.PostWhereUniqueInput

  @ApiProperty({ required: false })
  where?: Prisma.PostWhereInput

  @ApiProperty({ required: false })
  orderBy?: Prisma.PostOrderByWithRelationInput
}
