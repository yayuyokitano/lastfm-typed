# lastfm-typed

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/04d6fccb32494d0b95fe631c702ad0fc)](https://app.codacy.com/gh/yayuyokitano/lastfm-typed?utm_source=github.com&utm_medium=referral&utm_content=yayuyokitano/lastfm-typed&utm_campaign=Badge_Grade)

- [Introduction](#introduction)

- [Usage](#usage)
    - [Structure](#structure)
    - [Examples](#examples)
- [Helper Methods](#helper-methods)

## Introduction

lastfm-typed is a fully typed library for interaction with the [Last.FM API](https://www.last.fm/api). Uses promises.

For a full documentation of this library, please visit the [documentation website,](https://yayuyokita.no/lastfm-typed/) complete with interactive examples.

### IMPORTANT: Breaking changes in 2.0.0

Version 2.0.0 of lastfm-typed brings with it many breaking changes, mainly related to the typing of responses. Typescript should tell you where you need to make changes if you choose to upgrade.
It is highly recommended that you update, as this comes in response to changes to last.fm's API causing issues with the previous versions. Version 2.0.0 comes with [a website to document it.](https://yayuyokita.no/lastfm-typed/)

### Changes: 2.0.2

2.0.2 upgrades dependencies, most notably node-fetch vulnerability

## Usage

The library will call the appropriate endpoint (helper functions may call multiple and do additional processing), and format data to more appropriate types and structures than the default api. The structure output by lastfm-typed can be seen and tested in this documentation, and can also be seen from the typings in your IDE. In general, #text, @attr attributes are both renamed everywhere, and some groupings may change. Some deprecated properties may also not be shown. You can view the result of endpoints in the [documentation website.](https://yayuyokita.no/lastfm-typed/)

In general, required parameters are given as separate parameters, while optional parameters are added to an object as the final parameter. However, you can also run endpoints with only one argument, being an object with both required and any optional parameters specified.

### Structure

The library exports a single class. This class, in turn, creates instances of a series of sub-classes, allowing using endpoints through their exact Last.FM API names. The object keeps track of your api key and api secret, so you don't have to reenter those. To initialize:

```ts
import LastFMTyped from "lastfm-typed";

const lastfm = new LastFMTyped(apiKey:string, options?:{apiSecret?:string, userAgent?:string, secureConnection?:boolean}); //insert key, secret, user agent, and whether to use https here
```

`api_key` is the only required parameter.

Without `api_secret`, auth commands will not work. This includes usage of session key in place of username for typically non-auth functions.

For user agent, please initialize this with an easily identifiable name (preferably one that would lead to your program if googled). You can choose to not set one, in which case `lastfm-typed-npm` will be set as the user agent. This is probably the best idea if your program is not public. Please note that in browser user agent header cannot be set and whatever is here will be ignored.

`secureConnection` determines whether to use https or http. By default, this is `true`, which uses https. Set to `false` to use http.

Then we can call methods as needed.

### Examples

A simple authentication example:

```ts
const token = await lastfm.auth.getToken();

//replace this with whatever method you would use to show the url to the user
sendToUser(`https://www.last.fm/api/auth?api_key=${config.lastfm.key}&token=${token}`);

//replace this with whatever method you use to determine that the user has accepted integration.
await userInput;
	
const session = await lastfm.auth.getSession(token);
```

Getting info about a user:

```ts
const userInfo = await lastfm.user.getInfo("Mexdeep");
```

## Helper Methods

In addition to the default Last.FM methods, lastfm-typed offers a couple additional helper methods. The first group of helper methods are designed to help you with method parameters. These are `ArtistFromMBID`, `AlbumFromMBID`, `TrackFromMBID`, `ArtistFromName`, `AlbumFromName`, and `TrackFromName`. The MBID functions takes a single MBID parameter, `ArtistFromName` takes a single artist name parameter, while `TrackFromName` and `AlbumFromName` take two parameters, the artist name and the name of the track/album. These methods then returns a `ArtistInput`, `AlbumInput`, or `TrackInput` that you can use with the getter functions.

```ts
const album = await lastfm.album.getInfo(lastfm.helper.AlbumFromName("KITANO REM", "RAINSICK/オレンジ"), {username:"Mexdeep"});
```

There are also some helper methods that add some basic functionality. These helper methods are documented in the [documentation website.](https://yayuyokita.no/lastfm-typed/)