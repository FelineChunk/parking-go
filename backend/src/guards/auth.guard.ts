import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "@supabase/supabase-js";
import { Request } from "express";

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    const supabase = createClient(
      this.configService.get<string>("SUPABASE_URL")!,
      this.configService.get<string>("SUPABASE_KEY")!,
    );

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    // Attach user to request for use in controllers/guards
    (request as any).supabaseUser = data.user;

    return true;
  }
}