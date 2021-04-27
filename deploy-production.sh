#!/bin/bash

npm run build
scp pub/* occupant_web@mantar.occupantfonts.com:~/mantar.occupantfonts.com/
