import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';
import { NotFoundException } from '@nestjs/common';

@Controller('attractions')
export class AttractionsController {
  constructor(private readonly attractionsService: AttractionsService) {}

  @Post()
  create(@Body() createAttractionDto: CreateAttractionDto) {
    return this.attractionsService.create(createAttractionDto);
  }

  @Get()
  findAll() {
    return this.attractionsService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    const attract_id = parseInt(id, 10);
    if (isNaN(attract_id)) {
      throw new NotFoundException(`Attraction with id ${id} not found.`);
    }
    return await this.attractionsService.findOne(attract_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttractionDto: UpdateAttractionDto) {
    return this.attractionsService.update(+id, updateAttractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attractionsService.remove(+id);
  }
}
