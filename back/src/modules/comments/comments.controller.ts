import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthJwtGuard } from '../auth/auth.jwt.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.commentsService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(AuthJwtGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Request() req) {
    return this.commentsService.update(+id, updateCommentDto, req.user.id, req.user.isAdmin);
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(+id, req.user.id, req.user.isAdmin);
  }
}
