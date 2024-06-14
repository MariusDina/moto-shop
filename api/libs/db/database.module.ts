import { Provider, DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({})
export class DatabaseModule {
  static forFeature(
    entities: EntityClassOrSchema[],
    repositories: Provider[],
  ): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature([...entities])],
      providers: [...repositories],
      exports: [...repositories],
    };
  }
}
