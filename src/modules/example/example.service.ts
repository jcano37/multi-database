import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './entities/example.entity';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,
  ) {}

  create(createExampleDto: CreateExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(createExampleDto);
    return this.exampleRepository.save(example);
  }

  findAll(): Promise<Example[]> {
    return this.exampleRepository.find();
  }

  findOne(id: string): Promise<Example> {
    return this.exampleRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: string,
    updateExampleDto: UpdateExampleDto,
  ): Promise<Example> {
    await this.exampleRepository.update(id, updateExampleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.exampleRepository.delete(id);
  }
}
