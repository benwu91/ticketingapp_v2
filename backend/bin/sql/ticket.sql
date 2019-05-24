CREATE TABLE ticket(
    "accountId" INTEGER REFERENCES account(id),
    "eventId"   INTEGER REFERENCES events(id),
    code        VARCHAR(64),
    PRIMARY KEY ("accountId", "eventId")
);