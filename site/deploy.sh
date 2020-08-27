#!/usr/bin/env bash

# first build it
#npm run build

# now rsync them 
rsync -vh -az public/ tremeio@tremeio:~/stylo.treme.io/
