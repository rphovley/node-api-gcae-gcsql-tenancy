docker exec -it f0-datalake_db_test psql -U test -c "DROP SCHEMA public CASCADE;CREATE SCHEMA public;"
docker exec -it f0-datalake_api_test yarn migrations
docker exec -it f0-datalake_api_test yarn test:run
