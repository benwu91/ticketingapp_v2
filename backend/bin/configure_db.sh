#!/bin/bash

export PGPASSWORD='node_password'

echo "Configuring ticketingappdb"

dropdb -U node_user ticketingappdb
createdb -U node_user ticketingappdb

psql -U node_user ticketingappdb < ./bin/sql/account.sql 
psql -U node_user ticketingappdb < ./bin/sql/events.sql 
psql -U node_user ticketingappdb < ./bin/sql/ticket.sql 

echo "ticketingappdb configured"