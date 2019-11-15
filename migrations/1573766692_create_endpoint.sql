CREATE TABLE endpoint (
    id SERIAL NOT NULL primary key,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    restored_at timestamp with time zone,
    name character varying(255),
    url TEXT,
    import_id INTEGER NOT NULL
);

ALTER TABLE ONLY endpoint
    ADD CONSTRAINT endpoint_import_id_fkey FOREIGN KEY (import_id) REFERENCES import(id) ON UPDATE CASCADE;
