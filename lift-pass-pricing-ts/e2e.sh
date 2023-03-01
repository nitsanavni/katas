#!/usr/bin/env bash

timeout 3 node index.js > /dev/null &
PID=$!
sleep .5
port=$((3000 + ${STRYKER_MUTATOR_WORKER:-0}))

for type in 1jour night
do
    curl -s "localhost:$port/prices?type=$type"
    echo ""
    for age in 5 6 7 15 16 64 65
    do
        curl -s "localhost:$port/prices?type=$type&age=$age"
        echo ""
        for d in "2019-02-18" "2019-02-25" "2019-03-04" "2019-03-01" "2023-02-27" "2019-09-02" "2019-09-03" "2019-02-11" "2019-02-12"
        do
            curl -s "localhost:$port/prices?type=$type&age=$age&date=$d"
            echo ""
        done
    done
done

curl -s "localhost:$port/prices?type=1jour&date=2023-02-27"
echo ""
curl -s "localhost:$port/prices?type=1jour&date=2019-09-02"
echo ""

kill $PID
