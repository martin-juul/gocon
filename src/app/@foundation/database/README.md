# @foundation/database

This is a fork of [typeorm](https://github.com/typeorm/typeorm) initially based from [c23c888](https://github.com/typeorm/typeorm/commit/c23c88802cee33e377bc2ce85ed9aa2e6e1c14c8)

ionic capacitor support is why this exists. I've left in the other mobile drivers, but they're not tested.
Pull requests are more than welcome, as long as they don't break in capacitor.

## Drivers

+ cordova
+ expo
+ nativescript
+ sqlite
+ sqlite-abstract
+ sqljs
+ sql-in-memory

## Major Changes

+ Stripped irrelevant drivers
+ Removed redis cache driver
+ Removed `options.schema` as they're not supported in the sqlite drivers
+ Renamed all files to use kebab-case
+ Added index.ts in all directories

## TODO

+ [] Remove unsupported database options (e.g. array prop in metadata)
+ [] Add and refactor test suite
+ [] Figure out how to run migrations reliably on iOS and Android
+ [] ormconfig
+ [] custom cli for generating migrations

## Performance

Currently the aim is just to get typeorm to work in capacitor and electron.
When basic querying is somewhat reliable, then the focus should be shifted towards performance improvements.

Due to the sheer size of the awesome typeorm projects, there's a lot of duplicated code.
Features that are too heavy to run on phones, should be stripped.
