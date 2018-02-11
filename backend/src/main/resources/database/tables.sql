DROP TABLE IF EXISTS "feedback";
DROP TABLE IF EXISTS "service";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "order_status";
DROP TABLE IF EXISTS "user_role";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS "office";
DROP TABLE IF EXISTS "address";

CREATE TABLE "role" (
  role_pk     SERIAL4 PRIMARY KEY  NOT NULL,
  name        VARCHAR(45)          NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE "user" (
  user_pk      SERIAL4 PRIMARY KEY              NOT NULL,
  login        VARCHAR(45) UNIQUE               NOT NULL,
  password     VARCHAR(255)                     NOT NULL,
  first_name   VARCHAR(45)                      NOT NULL,
  last_name    VARCHAR(45)                      NOT NULL,
  phone_number VARCHAR(45),
  email        VARCHAR(45) UNIQUE               NOT NULL,
  manager      INT,
  address_fk   INT
);

CREATE TABLE "user_role" (
  ur_pk   SERIAL4 PRIMARY KEY NOT NULL,
  user_fk INT                 NOT NULL,
  role_fk INT                 NOT NULL
);

CREATE TABLE "address" (
  address_pk SERIAL4 PRIMARY KEY  NOT NULL,
  street     VARCHAR(45)          NOT NULL,
  house      VARCHAR(5)           NOT NULL,
  floor      SMALLINT             NOT NULL,
  flat       SMALLINT             NOT NULL
);

CREATE TABLE "office" (
  office_pk   SERIAL4 PRIMARY KEY     NOT NULL,
  name        VARCHAR(45)             NOT NULL,
  address_fk  INT                     NOT NULL,
  description VARCHAR(300)
);

CREATE TABLE "order" (
  order_pk          SERIAL4 PRIMARY KEY    NOT NULL,
  user_fk           INT                    NOT NULL,
  office_fk         INT                    NOT NULL,
  order_status_fk   INT                    NOT NULL,
  client_address_fk INT                    NOT NULL,
  time              TIMESTAMP,
  description       VARCHAR(300)
);

CREATE TABLE "feedback" (
  feedback_pk SERIAL4 PRIMARY KEY  NOT NULL,
  order_fk    INT                  NOT NULL,
  text        VARCHAR(300)
);

CREATE TABLE "order_status" (
  order_status_pk SERIAL4 PRIMARY KEY    NOT NULL,
  name            VARCHAR(45) UNIQUE     NOT NULL,
  description     VARCHAR(300)
);

CREATE TABLE "service" (
  service_pk  SERIAL4 PRIMARY KEY NOT NULL,
  order_fk    INT                 NOT NULL,
  courier_fk  INT,
  operator_fk INT                 NOT NULL,
  date        TIMESTAMP           NOT NULL,
  attempt     SMALLINT            NOT NULL
);