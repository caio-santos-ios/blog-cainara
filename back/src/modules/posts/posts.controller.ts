import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthJwtGuard } from '../auth/auth.jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'coverPhoto', maxCount: 1},
    {name: 'photos', maxCount: 4}
  ]))
  create(@Body() createPostDto: CreatePostDto, @UploadedFiles() files: any, @Request() req) {
    const photos = []
    files.photos.map((el) => photos.push(el.path))
  
    return this.postsService.create(createPostDto, files.coverPhoto[0].path, photos, req.user.id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'coverPhoto', maxCount: 1},
    {name: 'photos', maxCount: 4}
  ]))
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @UploadedFiles() files: any, @Request() req) {
    
    
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
