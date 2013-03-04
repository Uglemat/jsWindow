#!/usr/bin/env bash

dest="jsWindow_distribution"

rm -rf $dest
mkdir $dest
mkdir $dest/resources
cp resources/jquery-1.9.1.min.js $dest/resources/jquery-1.9.1.min.js

cp jsWindow.js $dest/jsWindow.js
lessc jsWindow_style.less > $dest/jsWindow_style.css

cp demo_files/* $dest
