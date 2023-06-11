# Express.js API to fetch RSS feed from The Guardians

# Setup

1. create .env and pg_env.txt file by
```
cp env_samples/env_sample.txt ./.env
cp env_samples/pg_env_sample.txt ./pg_env.txt
```

2. run docker-compose build
```
docker-compose build
```

3. run docker-compose up
```
docker-compose up -d
```

4. view node logs
```
docker-compose logs -f web
```