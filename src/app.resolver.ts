import {} from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor() {}

  @Query((returns) => String)
  async getAll() {
    return 'asdasd';
  }
}
