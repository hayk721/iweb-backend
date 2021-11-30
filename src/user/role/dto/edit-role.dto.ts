import { IsString, IsOptional } from 'class-validator';

export class EditRoleDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_AR: string;
}
