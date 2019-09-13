# get project version from package.json
version=$(grep -oP '(?<=version": ")[^"]*' ./package.json)

# zip the dist folder
zip cerberus-front-${version}.zip -r ./dist

# move it to ./dist
mv ./cerberus-front-${version}.zip ./dist

# remote copy to host
echo "$CERBERUS_VM_HOST"
#rcp "$CERBERUS_VM_HOST":/"$CERBERUS_VM_USER"/"$CERBERUS_VM_PASSWORD"/cerberus-front-${version}.zip
