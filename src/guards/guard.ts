import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { publicKey } from '../auth/dto/dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    return this.jwtService
      .verifyAsync(token, { publicKey })
      .then((decoded) => {
        request.user = decoded;
        return !!decoded;
      })
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  private getToken(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
