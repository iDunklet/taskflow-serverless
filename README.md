# TaskFlow Serverless

REST API for task management, developed with **TypeScript, Node.js and Express**, with the goal of migrating to a serverless architecture using **AWS Lambda, API Gateway and DynamoDB**.

## Project Overview

TaskFlow Serverless is a backend learning project focused on building a REST API and progressively adapting it to AWS cloud services.

The application currently supports CRUD operations for managing tasks, with an architecture divided into routes, controllers and services.

**Current status:** Local REST API completed. AWS integration is planned.

## Tech Stack

**Currently implemented:**
- Node.js
- TypeScript
- Express.js
- REST API
- npm
- Postman (API testing)

**Planned:**
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- AWS SDK for JavaScript
- Automated testing

## Project Structure

```text
taskflow-serverless/
├── src/
│   ├── controllers/
│   │   └── TaskController.ts
│   ├── models/
│   │   ├── Task.ts
│   │   └── TaskStatus.ts
│   ├── routes/
│   │   └── taskRoutes.ts
│   ├── services/
│   │   └── TaskService.ts
│   └── app.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## API Endpoints

Base URL: `http://localhost:3000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Task Model

Each task contains the following properties:

| Property | Type | Description |
|---|---|---|
| id | number | Unique task identifier |
| title | string | Task title |
| description | string | Task description |
| status | string | PENDING, IN_PROGRESS or COMPLETED |
| completed | boolean | Completion indicator |

### Example Task

```json
{
  "id": 1,
  "title": "Learn AWS",
  "description": "Study Lambda and DynamoDB",
  "status": "IN_PROGRESS",
  "completed": false
}
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/taskflow-serverless.git
cd taskflow-serverless
```

Install dependencies:

```bash
npm install
```

Compile the TypeScript project:

```bash
npx tsc
```

Start the server:

```bash
node dist/app.js
```

The API will be available at:

`http://localhost:3000/api/tasks`

## Example: Create a Task

**POST** `/api/tasks`

Request body:

```json
{
  "title": "Learn DynamoDB",
  "description": "Understand NoSQL databases on AWS",
  "status": "PENDING"
}
```

Successful response: `201 Created`.

The server automatically assigns an ID and initializes `completed` to `false`.

## HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Invalid request data |
| 404 | Resource not found |

## Data Persistence

Currently, tasks are stored in an **in-memory array**.

This means data is reset when the server restarts.

A future version will replace in-memory storage with **Amazon DynamoDB**.

## Roadmap

- [x] Initialize Node.js and TypeScript project
- [x] Implement REST API with Express
- [x] Create task models
- [x] Implement GET, POST, PUT and DELETE
- [x] Add request validation and HTTP error responses
- [x] Test endpoints using Postman
- [ ] Integrate Amazon DynamoDB
- [ ] Deploy API using AWS Lambda
- [ ] Configure Amazon API Gateway
- [ ] Add automated tests
- [ ] Document the final cloud architecture

## Purpose

This project is part of my backend development portfolio and is designed to strengthen my skills in:

- REST API design
- TypeScript and Node.js
- Layered backend architecture
- Cloud computing
- Serverless applications
- AWS services

## Author

Developed as a personal backend learning and portfolio project.