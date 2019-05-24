CREATE TABLE events(
    id                 SERIAL PRIMARY KEY,
    title              VARCHAR(64),
    "eventDate"        VARCHAR(64),
    "beginTime"        VARCHAR(64),
    "endTime"          VARCHAR(64),
    "eventAddress"     VARCHAR(64),
    "eventDescription" VARCHAR(1000)
);