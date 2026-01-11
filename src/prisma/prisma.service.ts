import "dotenv/config";
import { env } from "prisma/config";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";

@Injectable()
export class PrismaService extends PrismaClient
implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            adapter: new PrismaPg({ 
                connectionString: env("DATABASE_URL") 
            })
        })
    }
    async onModuleInit() {
        return this.$connect();        
    }

    async onModuleDestroy() {
        return this.$disconnect();        
    }
}
