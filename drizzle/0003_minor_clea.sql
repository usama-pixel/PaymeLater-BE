ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "address";