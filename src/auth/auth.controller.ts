import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';
import { AuthDto } from './dto';

// "/auth/...."
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) { }

  // "/auth/signup"
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    try {
      const user = await this.authservice.signUp(dto);
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // "/auth/signin"
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    try {
      const user = await this.authservice.signin(dto)
      return user
    } catch (error) {
      console.error('signin error', error);
      throw error
    }
  }
}


// signup(@Body('email') email: string, @Body('password', ParseIntPipe) password: string) { //dto means data transfer object
//     log({
//         email,
//         password,
//         typeofpass: typeof password,
//         typeofemail: typeof email
//     });
//     return this.authservice.signUp()
// }

//we dont usually use Req in controller but just for demo , nest uses dto and validation pipes
// signup(@Req() req : Request) {
//     log(req.body);
//     return this.authservice.signUp()
// }