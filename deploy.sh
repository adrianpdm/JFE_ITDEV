#!/usr/bin/env sh

# abort on errors
set -e

yarn run build
cd dist

git init
git add -A
git commit -m 'deploy'

if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -