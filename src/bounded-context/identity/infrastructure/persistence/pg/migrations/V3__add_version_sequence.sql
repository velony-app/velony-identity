CREATE SEQUENCE version_seq;

CREATE OR REPLACE FUNCTION public.next_version()
RETURNS bigint VOLATILE AS $$
BEGIN
    RETURN nextval('version_seq');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.set_version()
RETURNS TRIGGER AS $$
BEGIN
    NEW.version = next_version();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
