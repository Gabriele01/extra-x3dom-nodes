#!/bin/bash 
output=extra-x3dom-nodes.js
if [ -e $output ]
then 
    rm $output 
fi
touch $output 
for dir in `ls -p | grep ".*/"`
do
    for file in `ls $dir | grep ".*\.js"`
    do
        cat $dir/$file >> $output
    done 
done

