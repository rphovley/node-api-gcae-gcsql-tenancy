
docker_registry="gcr.io/"
project="fundzero/f0-datalake_api"

commit_hash=$(git rev-parse --short HEAD)

printf "\nCopy the following commit hash: "
printf "${commit_hash}\n\n" # latest commit hash of HEAD
printf "Use this hash to update the tag for the docker image in docker-compose.yml (on production / beta)\n\n"
echo "Once you have done that, press ENTER to continue"
read enterToContinue

# build / tag / push
docker build -t $project:$commit_hash . || exit 1
docker tag $project:$commit_hash $docker_registry$project:latest || exit 1
printf "image tag aliased to :latest...\n"
docker push $docker_registry$project:latest || exit 1
printf "image successfully pushed to registry at ${docker_registry$project}\n"

printf "\n Great job, you!\n\n"
