import { Module } from '@nestjs/common';
import { GithubClient } from './github.client';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  controllers: [GithubController],
  providers: [GithubClient, GithubService],
})
export class GithubModule {}
