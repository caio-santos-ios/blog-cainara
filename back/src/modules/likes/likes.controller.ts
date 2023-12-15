import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { AuthJwtGuard } from '../auth/auth.jwt.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  create(@Body() createLikeDto: CreateLikeDto, @Request() req) {
    return this.likesService.create(createLikeDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.likesService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto, @Request() req) {
    return this.likesService.update(+id, updateLikeDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.likesService.remove(+id, req.user.id);
  }
}
