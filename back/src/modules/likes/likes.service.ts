import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/database/prismaService';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService){}
  async create(createLikeDto: CreateLikeDto, accountId: number) {
    accountId = Number(accountId)

    const findPost = await this.prisma.post.findUnique({
      where: { id: createLikeDto.postId }
    })

    if(!findPost) throw new NotFoundException("post not found")

    const accountLike = await this.prisma.post.findUnique({
      where: { id: createLikeDto.postId },
      include: {
        likes: true
      }
    })

    if(accountLike){
      const myLike = await Promise.all(
        accountLike.likes.filter((el: any) => el.accountId == accountId)
      )
      
      if(myLike.length > 0) {

        await this.prisma.like.delete({
          where: {
            id: myLike[0].id
          }
        })
        return "delike"
      }
    }
   
    const like = await this.prisma.like.create({
      data: { ...createLikeDto, accountId }
    })
    return like;
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number, accountId: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto, accountId: number) {
    return `This action updates a #${id} like`;
  }

  async remove(id: number, accountId: number) {
    const findLike = await this.prisma.like.findUnique({
      where: { id }
    })
    
    if(!findLike) throw new NotFoundException("like not found")

    if(findLike.accountId != accountId) throw new ConflictException()  

    await this.prisma.like.delete({
      where: { id }
    })

    return;
  }
}
