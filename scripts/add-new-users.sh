#!/bin/bash
cd "$(dirname $0 | pwd)"

node script-partials/setup.js
node script-partials/add-new-users.js
