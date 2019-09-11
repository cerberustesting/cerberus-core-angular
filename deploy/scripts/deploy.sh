# get project version from package.json
version=$(grep -oP '(?<=version": ")[^"]*' ./package.json)

# zip the dist folder
zip cerberus-front-${version}.zip -r ./dist

# move it to ./dist
mv ./cerberus-front-${version}.zip ./dist