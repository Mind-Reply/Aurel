CREATE TABLE IF NOT EXISTS intakes (id TEXT PRIMARY KEY, brand TEXT, name TEXT, email TEXT, company TEXT, problem TEXT, budget TEXT, consent TEXT, created_at TEXT);
CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, area TEXT, action TEXT, status TEXT, created_at TEXT);
