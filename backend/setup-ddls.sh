#!/bin/bash

sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "superADMIN123!@#" -Q "CREATE DATABASE dev;"

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "superADMIN123!@#" -d dev -Q "
CREATE TABLE clients (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(128) NOT NULL,
    contact_name NVARCHAR(64) NOT NULL,
    cnpj CHAR(14),
    date DATETIME NOT NULL
);

CREATE INDEX ix_name ON clients (name);

CREATE TABLE reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    date DATETIME NOT NULL,
    client_id INT NOT NULL FOREIGN KEY (id) REFERENCES clients(id),
    score INT NOT NULL,
    reason NVARCHAR(MAX) NOT NULL
);

CREATE INDEX ix_cmp_client_id_date ON reviews (client_id, date DESC);
"