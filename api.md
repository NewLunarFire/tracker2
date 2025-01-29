# API documentation

This is an un-official API documentation for the systems in tracker2. API calls listed here at subject to change at any time.

## Plugin
get_inventory(): Get the inventory

get_checks(): Get the list of checks

read_state(): Get the current state of the game (for auto-tracking)

## SNES

read_memory(address, length): Reads `len` bytes memory from the snes at the specified `address`.
