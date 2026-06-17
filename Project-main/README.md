# Project Main

This project is now organized from a single root with 3 main parts:

- `Project-Frontend` for the React/Vite app
- `Project-Backend` for the Express API
- `Project-Backend/Databases` for database files and Docker compose

## Run From Root

Open a terminal in `Project-main` and use:

```powershell
npm run backend
npm run frontend
```

To open both frontend and backend in separate PowerShell windows:

```powershell
npm run start-all
```

## Database

Database files:

- `Project-Backend/Databases/jwt.sql`
- `Project-Backend/Databases/docker-compose-mysql-phpmyadmin.yaml`

If you use Docker:

```powershell
npm run db:up
```

To stop the containers:

```powershell
npm run db:down
```

## Backend Environment

Database connection values are stored in `Project-Backend/.env`.

## Integration

- Frontend calls `http://localhost:3000`
- Backend connects to MySQL with the `.env` config
- Buyer property list should use backend data, not only local mock data
