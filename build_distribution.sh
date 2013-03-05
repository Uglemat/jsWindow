#!/usr/bin/env bash

command -v lessc 1>&- 2>&- || { 
    echo >&2 "You need to have lessc. You can install it with the node package manager by running this: npm install -g less"
    exit 1
}
echo "Found lessc: $(which lessc)"

dest="jsWindow_distribution"

echo "Destionation folder: $dest"

if [ -a $dest ]; then
    echo "\"$dest\" already exists:"
    read -p "  *  Press enter to remove it. Press an alphanumeric character like 'n' to abort removal." -n 1 -r
    if [[ $REPLY =~ [a-zA-Z0-9] ]]; then 
        echo
        echo "Abort... $dest was not removed."
        exit 0
    fi

    echo -n "Removing $dest..."
    rm -rf $dest
    echo " Done."
fi

mkdir $dest
mkdir $dest/resources
cp resources/jquery-1.9.1.min.js $dest/resources/jquery-1.9.1.min.js

echo "Copying jsWindow.js --> $dest/jsWindow.js"
cp jsWindow.js $dest/jsWindow.js
echo "Compiling jsWindow_style.less --> $dest/jsWindow_style.css"
lessc jsWindow_style.less > $dest/jsWindow_style.css

echo -n "Copying demo files into $dest.. "
cp demo_files/* $dest
echo  "done. You should now be able to open $dest/demo.html in your browser."
