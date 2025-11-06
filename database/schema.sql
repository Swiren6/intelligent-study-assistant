-- Schéma de base de données PostgreSQL
-- Assistant Intelligent d'Organisation des Études

-- Table Utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    niveau VARCHAR(50),
    langue VARCHAR(10) DEFAULT 'fr',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Matières
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    couleur VARCHAR(7) DEFAULT '#0ea5e9',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Tâches/Examens
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    date_limite TIMESTAMP NOT NULL,
    priorite INTEGER DEFAULT 1 CHECK (priorite BETWEEN 1 AND 5),
    etat VARCHAR(20) DEFAULT 'à faire',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Emploi du Temps
CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    fichier_pdf VARCHAR(255),
    date_import TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Cours (extraits de l'emploi du temps)
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER REFERENCES schedules(id) ON DELETE CASCADE,
    jour VARCHAR(20) NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    matiere VARCHAR(100) NOT NULL,
    salle VARCHAR(50),
    enseignant VARCHAR(100)
);

-- Table Planning
CREATE TABLE IF NOT EXISTS plannings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    titre VARCHAR(200) DEFAULT 'Planning d''étude',
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Sessions d'Étude
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    planning_id INTEGER REFERENCES plannings(id) ON DELETE CASCADE,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    matiere VARCHAR(100),
    description TEXT,
    completee BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    date_envoi TIMESTAMP NOT NULL,
    lue BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_date_limite ON tasks(date_limite);
CREATE INDEX idx_sessions_planning_id ON sessions(planning_id);
CREATE INDEX idx_sessions_date ON sessions(date);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_lue ON notifications(lue);

-- Commentaires
COMMENT ON TABLE users IS 'Table des utilisateurs de l''application';
COMMENT ON TABLE subjects IS 'Table des matières étudiées';
COMMENT ON TABLE tasks IS 'Table des tâches et examens';
COMMENT ON TABLE schedules IS 'Table des emplois du temps importés';
COMMENT ON TABLE courses IS 'Table des cours extraits de l''emploi du temps';
COMMENT ON TABLE plannings IS 'Table des plannings d''étude générés';
COMMENT ON TABLE sessions IS 'Table des sessions d''étude planifiées';
COMMENT ON TABLE notifications IS 'Table des notifications envoyées aux utilisateurs';