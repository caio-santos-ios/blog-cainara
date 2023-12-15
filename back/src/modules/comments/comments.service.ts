import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/database/prismaService';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService){}

  async create(createCommentDto: CreateCommentDto, accountId: number) {
    accountId = Number(accountId)

    const findPost = await this.prisma.post.findUnique({
      where: { id: createCommentDto.postId }
    })

    if(!findPost) throw new NotFoundException("post not found")

    const comment = await this.prisma.comment.create({
      data: { ...createCommentDto, accountId }
    })
    
    return comment;
  }

  async findAll() {
    return `This action returns all comments`;
  }

  async findOne(id: number, accountId: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, accountId: number, isAdmin: boolean) {
    const findComment = await this.prisma.comment.findUnique({
      where: { id }
    })

    if(!findComment) throw new NotFoundException("comment not found")

    if(findComment.accountId != accountId && !isAdmin) throw new ConflictException()  

    if(updateCommentDto.postId) throw new ConflictException("Não pode alterar o id do post")

    const commentUpdate = await this.prisma.comment.update({
      where: { id },
      data: { ...updateCommentDto }
    })

    return commentUpdate;
  }

  async remove(id: number, accountId: number, isAdmin: boolean) {
    const findComment = await this.prisma.comment.findUnique({
      where: { id }
    })

    if(!findComment) throw new NotFoundException("comment not found")

    if(findComment.accountId != accountId && !isAdmin) throw new ConflictException()  

    await this.prisma.comment.delete({
      where: { id }
    })
    return;
  }
}
