## Como rodar esse projeto
1. Clone o repositório
2. Instale as dependências

```bash
npm i 
```

3. Crie um container com o banco de dados
```bash
docker-compose up -d
```

4. Rode todas migrations

```bash
npm run prisma:migration:run
```
5. Seed db

```bash
npm run prisma:seed
```
6. Rode o back-end em desenvolvimento:

```bash
npm run dev
```