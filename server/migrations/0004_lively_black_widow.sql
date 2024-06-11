CREATE TABLE IF NOT EXISTS "emailToken" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "emailToken_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
DROP TABLE "email_token";