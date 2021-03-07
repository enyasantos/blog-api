export = {
   type: "postgres",
   host: process.env.DATABASE_HOST,
   port: process.env.DATABASE_PORT,
   username: process.env.DATABASE_USERNAME,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   synchronize: true,
   logging: false,
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}