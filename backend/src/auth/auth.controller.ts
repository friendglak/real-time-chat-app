import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return await this.usersService.findById(userId);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;

    const decoded = this.authService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.authService.refreshToken(decoded.sub, refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;

    const decoded = this.authService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.usersService.removeRefreshToken(decoded.sub);

    return { message: 'Logout successful' };
  }
}
