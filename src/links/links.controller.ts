import {  Controller, Delete, Get, Param, Post,Body } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private linksServise:LinksService){}
  @Get()
  async getAllLinks(){
    return await this.linksServise.findAll();
  }

  @Delete(':id')
  async deleteLink(@Param('id') id: string){
    return await this.linksServise.deleteOne(id)
  }

  @Post()
  async createLink(@Body() data: CreateLinkDto){
    return await this.linksServise.createOne(data)
  }
}
