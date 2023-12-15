import { Injectable, NotFoundException, UploadedFiles } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {v2 as cloudinary} from 'cloudinary';
import { Post } from './entities/post.entity';
import { PrismaService } from 'src/database/prismaService';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, coverPhoto: string, photos: string[], authorId: number) {
    authorId = Number(authorId)

    cloudinary.api.create_folder(`blog_receitas/${createPostDto.title}`)
    
    const savedPhotos = await Promise.all(
      photos.map(async (photo: string) => {
        const savePhoto = await cloudinary.uploader.upload(photo, { folder: `blog_receitas/${createPostDto.title}` });
        return { id: savePhoto.asset_id, url: savePhoto.secure_url  };
      })
    );
        
    const savedCoverPhoto = await cloudinary.uploader.upload(coverPhoto, { folder: `blog_receitas/${createPostDto.title}` })

    const instence = new Post()
    Object.assign(instence, {...createPostDto })

    const post = await this.prisma.post.create({
      data: {...createPostDto, coverPhoto: { id: savedCoverPhoto.asset_id , url: savedCoverPhoto.secure_url }, photos: savedPhotos, authorId}
    })
    
    return post;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        comments: {
          select: {
            id: true,
            text: true,
            account: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        _count: true
      }
    })
    return posts;
  }

  async findOne(id: number) {
    const findPost = await this.prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          select: {
            id: true,
            text: true,
            account: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        _count: true
      }
    })

    if(!findPost) throw new NotFoundException("Poste não encontrado")

    return findPost;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const findPost = await this.prisma.post.findUnique({
      where: { id }
    })
    
    if(!findPost) throw new NotFoundException("Poste não encontrado")    

    const postUpdate = await this.prisma.post.update({
      where: { id },
      data: { ...updatePostDto }
    })

    return postUpdate;
  }

  async remove(id: number) {
    const findPost = await this.prisma.post.findUnique({
      where: { id }
    })

    if(!findPost) throw new NotFoundException("Poste não encontrado")

    await this.prisma.post.delete({
      where: { id }
    })

    return;
  }
}
