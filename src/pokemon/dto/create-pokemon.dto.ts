import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  //string, minimo de 1
  @IsString()
  @MinLength(1)
  name: string;

  //entero, positivo, minimo de 1
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
}
