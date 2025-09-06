# 🎉 Peer2Peer Rental Microservices – NestJS 🚀

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS Logo" width="120"/>
</div>

![TypeScript](https://img.shields.io/badge/language-Typescript-blue?style=flat-square)
![Docker](https://img.shields.io/badge/infra-Docker-blueviolet?logo=docker)
![ElasticSearch](https://img.shields.io/badge/search-ElasticSearch-yellow?logo=elasticsearch)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-316192?logo=postgresql)
![Microservices](https://img.shields.io/badge/architecture-Microservices-brightgreen?logo=nestjs)
![BFF Layer](https://img.shields.io/badge/API%20Gateway-BFF%20Layer-red?logo=nestjs)
![Dummy Project](https://img.shields.io/badge/Dummy%20Project-Yes-lightgrey?style=flat-square)

---

## 🌟 Overview

**Peer2Peer Rental Microservices** is a dummy project built from scratch to demonstrate a modern, cloud-independent microservices architecture using [NestJS](https://nestjs.com/) and TypeScript. The project is designed for learning, prototyping, and as a showcase for senior-level backend patterns.

> **No cloud dependency:** All services run locally, orchestrated using Docker.

---

## 🧩 Architecture & Tech Stack

- **Microservices**: Each domain (User, Product, Feedback, API Gateway/BFF) is a separate NestJS service.
- **API Gateway (BFF Layer)**: The _Backend For Frontend_ (BFF) acts as an API aggregator, simplifying client integration.
- **Product Layer**: Utilizes **Elasticsearch** (via Docker) to power rich and scalable product search.
- **User Layer**: Relies on **PostgreSQL** (via Docker) for robust user management and persistence.
- **Feedback Layer**: Modular service to handle user feedback, reviews, and ratings.
- **Dockerized Infrastructure**: All services and dependencies (Postgres, Elasticsearch) are containerized for local development.
- **No vendor lock-in**: Easily adaptable to cloud deployment if needed.

---

## 🗂️ Service Breakdown

| Layer               | Tech           | Purpose                                                    |
|---------------------|----------------|------------------------------------------------------------|
| Product Management  | NestJS + ES    | CRUD, advanced search, rental listings                      |
| User Management     | NestJS + PGSQL | Auth, registration, user profiles, user CRUD                |
| Feedback Management | NestJS         | Collect and manage feedback and ratings                     |
| API Gateway (BFF)   | NestJS         | Frontend-friendly APIs, service aggregation                 |

---

## ⚡ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Install & Run

```bash
# Spin up dependencies via Docker (Elasticsearch, Postgres)
docker-compose up -d

# Install dependencies for each service
cd user_management && npm install
cd product_management && npm install
cd feedback_management && npm install
cd bff_layer && npm install

# Run each microservice (in separate terminals)
npm run start:dev
```

---

## 🏗️ Project Structure

```
Nestjs-microservices_peer_2_peer_rental_project/
│
├── user_management/         # User microservice
├── product_management/      # Product microservice (ElasticSearch)
├── feedback_management/     # Feedback/review microservice
├── bff_layer/               # API Gateway / BFF
└── docker-compose.yml       # Service orchestration
```

---

## 🌈 Highlights

- **Senior-level architecture:** Showcases real-world separation of concerns, scalability, and maintainability.
- **Cloud-agnostic:** Easy local spin-up, no vendor lock-in.
- **Elasticsearch integration:** Powerful, production-style search for products.
- **PostgreSQL for users:** Reliable relational model for user data.
- **BFF API Gateway:** Modern aggregation pattern for frontend consumption.
- **Easy extensibility:** Add new domains/microservices with minimal coupling.

---

## 📚 Further Reading & References

- [NestJS Docs](https://docs.nestjs.com/)
- [Microservices Patterns](https://microservices.io/)
- [ElasticSearch](https://www.elastic.co/elasticsearch/)
- [Docker Compose](https://docs.docker.com/compose/)
- [BFF Pattern](https://samnewman.io/patterns/architectural/bff/)

---

## 🤝 Contributing

This is a dummy project intended for experimentation and learning. Contributions, feedback, and forks are welcome!

---

## 📝 License

MIT

---

<div align="center">
  <b>🚀 Happy Coding! 🚀</b>
</div>
