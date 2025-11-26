import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


// "/auth/...."
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}
    
        // "/auth/signup"
        @Post('signup')
        signup() {
            return this.authservice.signUp()
        }
        
        // "/auth/signin"
        @Post('signin')
        signin() {
            return this.authservice.signin()
        }
    
}
