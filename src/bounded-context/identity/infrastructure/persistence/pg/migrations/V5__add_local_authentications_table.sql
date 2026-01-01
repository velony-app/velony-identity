ALTER TABLE public.users
DROP COLUMN IF EXISTS password_hash;

CREATE TABLE public.local_authentications (
    id serial PRIMARY KEY,
    uuid uuid DEFAULT uuid_generate_v7() NOT NULL UNIQUE,
    user_id integer NOT NULL,
    password_hash text NOT NULL,
    last_used_at timestamp NOT NULL DEFAULT now(),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT fk_local_authentications_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_local_authentications_user_id
ON public.local_authentications(user_id);
