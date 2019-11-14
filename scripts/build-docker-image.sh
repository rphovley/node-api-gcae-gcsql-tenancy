docker_registry="gcr.io/"
project="fundzero/f0-datalake_api"

commit_hash=$(git rev-parse --short HEAD)

docker build --tag $project:$commit_hash . || exit 1
docker tag $project:$commit_hash $docker_registry$project:latest || exit 1
