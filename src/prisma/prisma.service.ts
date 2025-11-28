import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


const adapter = new PrismaPg({ connectionString: "postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public" });

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(){
    super({adapter});
    
  }
}