set -e

host="$1"
shift
cmd="$@"

until psql -h "$host" -U "f0-datalake" -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing commands"
# >&2 echo "Running migrations"
# node migrations/migration
exec $cmd
