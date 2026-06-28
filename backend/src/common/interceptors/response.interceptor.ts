import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

/**
 * Wraps every controller (the "V" in this MVC layout) response in a
 * consistent envelope, the same way the original HUD mock expected a
 * single predictable shape for every telemetry feed.
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true as const,
        timestamp: new Date().toISOString(),
        data,
      })),
    );
  }
}
