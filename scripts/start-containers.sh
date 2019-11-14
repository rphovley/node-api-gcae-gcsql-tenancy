

$(aws ecr get-login --no-include-email --region us-west-1) || exit 1

docker-compose -p f0-datalake -f docker-compose.dev.yml up --force-recreate -d;
docker-compose -p f0-datalake -f docker-compose.dev.yml logs -f;
