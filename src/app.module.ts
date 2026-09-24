import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration], //nos enlaza con el ConfigModule
      validationSchema: JoiValidationSchema,
    }), //siempre va enciam porque es quien nos permite leer las variables de entorno

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // MongooseModule.forRoot(`${process.env.MONGODB}`, {
    //   dbName: 'pokemonsdb',
    // }),

    //se cambió por una falla de conexión con mongo atlas
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB,
        dbName: 'pokemonsdb',
      }),
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    //console.log(process.env);
  }
}
