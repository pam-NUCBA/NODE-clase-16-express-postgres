\l 

CREATE DATABASE tasks_list;
-- comentarios van así
\C tasks_list;

--asegurarse de que entre a tasks_list! sino va a crear la tabla en cualquier lugar y la app va a fallar

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY NOT NULL,
    task VARCHAR(50) NOT NULL,
    description VARCHAR(250)
);

\dt