# Cookie Clicker Auto Backup Save
Automatically backs up your save to a PHP webserver of your choice

## Setup

### PHP

1. On your PHP webserver, place the [./php/save.php](./php/save.php) file. Make sure it's in it's own directory.
2. Modify the constants on the top of the file.

### Tampermonkey

1. Download [Tampermonkey](https://www.tampermonkey.net/index.php)
2. Add a new script
3. Paste the code from [./tampermonkey/script.js](./tampermonkey/script.js)
4. Modify the constants on the top of the file.
4. Enable the script

## Usage
After enabling the Tampermonkey script, reload Cookie Clicker. It should then work.

When the backup is made, this is shown as a notification inside the Cookie Clicker game.