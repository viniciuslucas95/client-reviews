#!/bin/bash

sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "CREATE DATABASE $DATABASE_NAME;"

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d $DATABASE_NAME -Q "
CREATE TABLE clients (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(128) NOT NULL,
    contact_name NVARCHAR(64) NOT NULL,
    cnpj CHAR(14),
    date DATETIME NOT NULL
);

CREATE INDEX ix_name ON clients (name);

CREATE TABLE client_reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    date DATETIME NOT NULL,
    client_id INT NOT NULL FOREIGN KEY (client_id) REFERENCES clients(id),
    score INT NOT NULL,
    reason NVARCHAR(MAX) NOT NULL
);

CREATE INDEX ix_cmp_client_id_date ON client_reviews (client_id, date DESC);
"