CREATE TABLE public.users (
    id serial PRIMARY KEY,
    uuid uuid DEFAULT uuid_generate_v7() NOT NULL UNIQUE,
    name text NOT NULL,
    username text NOT NULL UNIQUE,
    avatar_path text,
    password_hash text,
    email text UNIQUE,
    phone_number text UNIQUE,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    deleted_at timestamp,
    version bigint NOT NULL
);

CREATE TRIGGER users_version_trigger
    BEFORE INSERT OR UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.set_version();

CREATE INDEX idx_users_version_id
ON public.users(version, id);
