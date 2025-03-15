import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return await this.usersService.createUser(body.email, body.password);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async getProtected(@Req() req) {
    return { message: 'This is a protected route!', user: req.user };
  }
}
