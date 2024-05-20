import { Injectable } from '@nestjs/common';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Attraction } from './entities/attraction.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common'; 

@Injectable()
export class AttractionsService {
  constructor(
    @InjectRepository(Attraction)
    private attractionsRepository: Repository<Attraction>,
  ) {}

  create(createAttractionDto: CreateAttractionDto) {
    return this.attractionsRepository.save(createAttractionDto)
  }

  findAll(){
    return this.attractionsRepository.find();
  }


  

  async findOne(attract_id: number): Promise<Attraction> {
    const attraction = await this.attractionsRepository.findOne({ where: { id: attract_id } });
    if (!attraction) {
      throw new NotFoundException(`Attraction with id ${attract_id} not found.`);
    }
    return attraction;
  }

//   findOne(attract_id: number){
//     const options: FindOneOptions<Attraction> = {
//         where: { id: attract_id }
//     };
//     return this.attractionsRepository.findOne(options);
// }


  update(id: number, updateAttractionDto: UpdateAttractionDto) {
    return this.attractionsRepository.update(id, updateAttractionDto);
  }

  async remove(id: number) {
    const attractionToRemove = await this.attractionsRepository.findOne({ where: { id: id } });
    if (!attractionToRemove) {
        throw new Error(`Attraction with id ${id} not found.`);
    }
    return this.attractionsRepository.remove(attractionToRemove);
}


  
}
