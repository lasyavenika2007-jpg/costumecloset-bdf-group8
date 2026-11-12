
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS actors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS costumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    era TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hires (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_id INTEGER NOT NULL,
    costume_id INTEGER NOT NULL,
    hire_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    return_date TEXT,
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'returned')),

    FOREIGN KEY (actor_id) REFERENCES actors(id),
    FOREIGN KEY (costume_id) REFERENCES costumes(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS
idx_one_active_hire_per_costume
ON hires(costume_id)
WHERE status = 'active';
