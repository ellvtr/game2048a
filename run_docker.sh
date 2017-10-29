docker rm -f game2048
docker run --name game2048 -d -p 8080:8080 ellvtr/game2048a
