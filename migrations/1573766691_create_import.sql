CREATE TABLE import (
    id SERIAL NOT NULL primary key,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    restored_at timestamp with time zone,
    run_every INTEGER 
);