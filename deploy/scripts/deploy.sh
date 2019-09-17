# get project version from package.json
version=$(grep -oP '(?<=version": ")[^"]*' ./package.json)
archive=cerberus-front-${version}.zip

# zip the dist folder
zip ${archive} -r ./dist
echo "archive "${archive}" has been created"

# move it to ./dist
mv ${archive} ./dist
echo "archive moved to /dist folder"

# remote copy to host
host=$CERBERUS_VM_HOST
user=$CERBERUS_VM_USER
password=$CERBERUS_VM_PASSWORD

sshpass -p ${password} ssh ${user}@${host}
# rcp cerberus-front-${version}.zip ${user}@${host}