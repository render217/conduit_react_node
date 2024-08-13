npm i -D typescript @types/express @types/node ts-node nodemon
npx tsc --init
-> open tsconfig.json => set rootDir:"./src" & outDir:"./dest"

npm i express dotenv ...

scripts:{
"build": "npx tsc",
"start": "node dist/server.js",
"dev": "nodemon src/server.ts"
}

npm i -D prisma
npx prisma init --datasource-provider sqlite | postgresql

then create your schema definitions...

npx prisma migrate dev --name init
