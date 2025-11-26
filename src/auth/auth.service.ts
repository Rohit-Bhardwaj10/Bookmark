import { Injectable } from "@nestjs/common";
import { User , Bookmark } from "@prisma/client";

@Injectable({})
export class AuthService {

    signUp() {
        return {msg : "i have signed up"}
    }


    signin() {
        return {msg : "i have signed in"}
    }
}