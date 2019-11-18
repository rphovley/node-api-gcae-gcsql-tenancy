CREATE TABLE param (
    id SERIAL NOT NULL primary key,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    restored_at timestamp with time zone,
    name character varying(255) NOT NULL,
    value TEXT NOT NULL,
    endpoint_id INTEGER NOT NULL
);

ALTER TABLE ONLY param
    ADD CONSTRAINT param_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES endpoint(id) ON UPDATE CASCADE;

CREATE TABLE query_param (
    id SERIAL NOT NULL primary key,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    restored_at timestamp with time zone,
    name character varying(255) NOT NULL,
    value TEXT NOT NULL,
    endpoint_id INTEGER NOT NULL
);

ALTER TABLE ONLY query_param
    ADD CONSTRAINT query_param_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES query_param(id) ON UPDATE CASCADE;
