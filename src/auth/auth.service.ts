import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signUp(dto: AuthDto) {
        // genrate the password hash
        const hash = await argon.hash(dto.password);

        // save the new user in db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
            },
            // one more way is to delete the hash from the user object before returning
            // select: {
            //     id: true,
            //     email: true,
            //     createdAt: true,
            // },
        });
        // return the user except the hash
        const { hash: _removed, ...safeUser } = user;
        return safeUser;
    }

    async signin(dto: AuthDto) {
        // find the user by email
        const founduser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        // if user does not exist throw exception
        if (!founduser) throw new ForbiddenException("credentials taken")
        // compare password
        const pwmatches = await argon.verify(founduser.hash, dto.password)
        // if password incorrect throw exception
        if (!pwmatches) throw new ForbiddenException("credentials imcorrect")

        // return user
        return founduser
    }
}
