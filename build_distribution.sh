#!/usr/bin/env bash

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


if [ $# == 0 ]; then
    echo "Run \`$0 -h\` for to see more options"
fi

force=false
compress_css=false
compress_js=false
dest="jsWindow_distribution"
orig_dest=$dest

while getopts ":fd:cjh" opt; do
    case $opt in
        \?) echo "Invalid option: -$OPTARG. Use the -h option for help." >&2
            exit 1             ;;
        :)  echo "Option -$OPTARG requires an argument. Use the -h option for help." >&2
            exit 1             ;;
        f)  force=true         ;;
        d)  dest=$OPTARG       ;; 
        c)  compress_css=true  ;;
        j)  command -v uglifyjs 1>&- 2>&- || { 
                echo >&2 "This script uses uglifyjs to compress javascipt, you need to have it installed to use the -f option"
                exit 1
            }
            echo "Found uglifyjs: $(which uglifyjs)"
            compress_js=true   ;;
        h) cat <<EOF
$0 options: 
 -f      : force (don't ask before deleting the destination if already existing).
 -d DEST : Set destination directory (default $orig_dest).
 -c      : Compress css with lessc (it doesn't compress css by default).
 -j      : Compress javascript with uglifyjs (it doesn't compress js by default).
 -h      : Show these options.

example:
 $ $0 -f -d my_dist -cj
                            |  |          |
                            |  |          Compress css and javascript
                            |  Put the new distribution inside my_dist
                            Use force (overwrite my_dist if it already exists)
EOF
            exit 1             ;;
    esac
done

command -v lessc 1>&- 2>&- || { 
    echo >&2 "You need to have lessc. You can install it with the node package manager by running this: npm install -g less"
    exit 1
}
echo "Found lessc: $(which lessc)"


echo "Destionation folder: $dest"

if [ -a $dest ]; then
    if !($force); then
        echo "\"$dest\" already exists:"
        read -p "  *  Press enter to remove it. Press an alphanumeric character like 'n' to abort removal." -n 1 -r
        if [[ $REPLY =~ [a-zA-Z0-9] ]]; then 
            echo
            echo "Abort... $dest was not removed."
            exit 0
        fi
    fi

    if !($force); then
        echo "Use the -f option if you don't want to be prompted before overwriting."
    fi

    echo -n "Removing $dest..."
    rm -rf $dest
    echo " Done."
fi

mkdir $dest
mkdir $dest/resources
cp resources/jquery-1.9.1.min.js $dest/resources/jquery-1.9.1.min.js

if $compress_js; then
    echo "Compressing jsWindow.js --> $dest/jsWindow.js"
    uglifyjs jsWindow.js > $dest/jsWindow.js
else
    echo "Copying jsWindow.js --> $dest/jsWindow.js"
    cp jsWindow.js $dest/jsWindow.js
fi

if $compress_css; then
    cat <<EOF > $dest/jsWindow_style.css
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
EOF
    echo "Compiling+compressing jsWindow_style.less --> $dest/jsWindow_style.css"
    lessc --compress jsWindow_style.less >> $dest/jsWindow_style.css
else
    echo "Compiling jsWindow_style.less --> $dest/jsWindow_style.css"
    lessc jsWindow_style.less > $dest/jsWindow_style.css
fi

echo -n "Copying demo files into $dest.. "
cp demo_files/* $dest
echo  "done. You should now be able to open $dest/demo.html in your browser."
