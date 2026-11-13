# CostumeCloset – Theatre Costume Hire Management System

CostumeCloset is a theatre costume hire management system developed using Node.js, Express.js, and SQLite as part of the Backend Development Fundamentals (BDF) Group Assignment.

It manages actors, costumes, and hire records with CRUD operations, input validation, search functionality, and a no-double-booking rule.

## Project Features

- Actor management
- Costume management
- Hire and return management
- SQLite database integration
- Input validation
- Costume search by era
- Prevention of duplicate active hires
- SQL JOIN operations

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Database Package:** sqlite3
- **Testing:** Node.js

## Database Structure

The project uses an SQLite database named `costumecloset.db`.

Three tables are created:

### 1. Actors Table

Stores actor information.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Actor name |

### 2. Costumes Table

Stores theatre costume information.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Costume name |
| era | TEXT | Historical era |

### 3. Hires Table

Stores costume hiring information.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| actor_id | INTEGER | Foreign key referencing actors |
| costume_id | INTEGER | Foreign key referencing costumes |
| hire_date | TEXT | Date of hiring |
| return_date | TEXT | Date of return |
| status | TEXT | Active or returned |

### Database Relationships

- Each hire record references an actor.
- Each hire record references a costume.
- Foreign key constraints maintain referential integrity.
- Hire status is restricted to `active` or `returned`.

## Sample Database Records

### Actors

| ID | Name |
|---|---|
| 1 | Asha |
| 2 | Ravi |

### Costumes

| ID | Costume Name | Era |
|---|---|---|
| 15 | Royal Victorian Gown | Victorian |
| 16 | Medieval Knight Armour | Medieval |
| 17 | Renaissance Dress | Renaissance |
| 18 | Royal Court Suit | Victorian |

## Database Setup

1. Clone the repository.
2. Install the required dependencies.
3. Configure the SQLite database connection.
4. Execute the database schema to create the tables and insert sample records.

### Installation

```bash
npm install
```

### Database Files

- `database.js` – Establishes the SQLite database connection and executes the schema.
- `schema.sql` – Defines database tables, relationships and sample records.
- `test-db.js` – Tests database operations.

### Run Database Tests

```bash
node test-db.js
```

## Team Contributions

| Team Member | Responsibility |
|---|---|
| Uday Sai Sriman | Backend Development and API Integration |
| K. Lasya Venika | Database Development |
| P. Sai Vidhatri | Costume CRUD Development |
| K. Rishitha | Validation and Search |
| B. Nikhsith | Hire Management and Double Booking Prevention |

## Project Information

**Course:** Backend Development Fundamentals (BDF)

**Project:** Group 8 – CostumeCloset

**Deadline:** 15 November 2026

**Demo and Individual Viva:** 16 November 2026
