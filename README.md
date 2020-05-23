# Todo Igaku

Main Technologies used

- Docker

(Backend - /server)

- GraphQL
- PostgreSQL

(Frontend - /client)

- React (create-react-app)
- Redux

## Installation

1. Assuming that you have installed latest version of `Docker`.
2. Clone this repo `git clone https://github.com/iwanbazz/todoIgaku`.
3. Cd into cloned directory `cd todoIgaku`.
4. Run `docker-compose up` then container will be created.
5. Access `http://localhost` to view the frontend, than `http://localhost:4000/graphql` to view graphql. Check on port `5432` to view PostgreSQL.

## Test the application

### Backend - /graphql

`http://localhost:4000/graphql`

#### Input Todo:

```sql
mutation {
  createTodo(action: "Test input todo task")
}
```

#### Get list Todo:

```sql
query {
  allTodos {
    id,
    action,
    completed
  }
}
```

#### Update Todo

```sql
mutation {
  updateCompleted(id 1, completed:true)
}
```
