# lastfm-typed

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/04d6fccb32494d0b95fe631c702ad0fc)](https://app.codacy.com/gh/yayuyokitano/lastfm-typed?utm_source=github.com&utm_medium=referral&utm_content=yayuyokitano/lastfm-typed&utm_campaign=Badge_Grade)

- [Introduction](#introduction)

- [Usage](#usage)
    - [Structure](#structure)
    - [Examples](#examples)
- [Helper Methods](#helper-methods)
    - [getCombo](#getcombo)
    - [getNowPlaying](#getnowplaying)
    - [getMatchingArtists](#getmatchingartists)
- [Logging](#logging)

## Introduction

lastfm-typed is a fully typed library for interaction with the [Last.FM API](https://www.last.fm/api). Uses promises.

### IMPORTANT: Breaking changes in 1.0.0

1.0.0 is the first major update to lastfm-typed, and it comes with a lot of breaking changes (hopefully the first and last time this happens).

It comes with a bunch of changes to attribute names in responses, so many that I will not list them all. Most notably, all instances of "#text" and "@attr" have been replaced with a descriptive name like "name" or "meta". Your IDE should help you deal with this, though I plan to make a full documentation of this later.
Additionally, the constructor call has changed. See [Usage](#usage) for the new way to call the class constructor.

### Changes: 1.3.2

1.3.3 fixes fatal bugs with artist.getCorrection and track.getCorrection.

## Usage

For the most part, the library stays close to the original input and input of the API. It is designed to be relatively self-documenting thanks to TypeScript types and variable names. As a general rule, required parameters will be separate method parameters, while optional parameters will be grouped into an optional final object parameter. All methods that take a user will also take a session key in its place, though when the username is optional it is separated into a separate `sk` property.

### Structure

The library exports a single class. This class, in turn, creates instances of a series of sub-classes, allowing using endpoints through their exact Last.FM API names. The object keeps track of your api key and api secret, so you don't have to reenter those. To initialize:

```ts
import LastFMTyped from "lastfm-typed";

const lastfm = new LastFMTyped(apiKey:string, options?:{apiSecret?:string, userAgent?:string, secureConnection?:boolean}); //insert key, secret, user agent, and whether to use https here
```

`api_key` is the only required parameter.

Without `api_secret`, auth commands will not work. This includes usage of session key in place of username for typically non-auth functions.

For user agent, please initialize this with an easily identifiable name (preferably one that would lead to your program if googled). You can choose to not set one, in which case `lastfm-typed-npm` will be set as the user agent. This is probably the best idea if your program is not public.

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

There are also some helper functions that add some basic functionality:

### getCombo

`helper.getCombo` takes a username, a limit on the number of tracks to search (can be arbitrarily high, but keep in mind that response times will increase with higher values, and that there will be another API request for every 1000 tracks).

<details>
  <summary>Example</summary>

  ```ts
  console.log(await lastfm.helper.getCombo("Mexdeep", 200));
  ```

  ```ts
  {
    "artist": {
      "name": "Unlucky Morpheus",
      "combo": 9
    },
    "album": {
      "name": "Hypothetical Box ACT3",
      "combo": 9
    },
    "track": {
      "name": "烏天狗",
      "combo": 0
    },
    "nowplaying": true,
    "image": [
      {
        "size": "small",
        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/87065ea72de7fe7992b02456a54e1859.png"
      },
      {
        "size": "medium",
        "#text": "https://lastfm.freetls.fastly.net/i/u/64s/87065ea72de7fe7992b02456a54e1859.png"
      },
      {
        "size": "large",
        "#text": "https://lastfm.freetls.fastly.net/i/u/174s/87065ea72de7fe7992b02456a54e1859.png"
      },
      {
        "size": "extralarge",
        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/87065ea72de7fe7992b02456a54e1859.png"
      }
    ]
  }
  ```
</details>

### getNowPlaying

`helper.getNowPlaying` allows you to get the last played track of a specified user, or currently playing if possible.
The optional second argument allows you to get details about the artist, album, and/or track for further processing. If multiple are specified, they are called simultaneously, with await on a Promise.all(), so it shouldn't increase response time, but it will still require an additional request per bit of info.
The optional third argument allows you to specify additional options, currently only the option `extended`, which when set to "1" will return some additional info from the user.getRecentTracks request.

<details>
  <summary>Example. NOTE: this response contains artist photos, which is not cleaned and is intentionally left out of typings as artist photos have been removed from the platform.</summary>
  
  ```ts
  console.log(await lastfm.helper.getNowPlaying("Mexdeep", ["album"]));
  ```
  
  ```ts
  {
    "recent": {
      "artist": "ひかりのなかに",
      "album": "まっすぐなままでいい",
      "track": "ひかり",
      "image": [
        {
          "size": "small",
          "url": "https://lastfm.freetls.fastly.net/i/u/34s/885a4f992b02a38b33adf88886ca4234.jpg"
        },
        {
          "size": "medium",
          "url": "https://lastfm.freetls.fastly.net/i/u/64s/885a4f992b02a38b33adf88886ca4234.jpg"
        },
        {
          "size": "large",
          "url": "https://lastfm.freetls.fastly.net/i/u/174s/885a4f992b02a38b33adf88886ca4234.jpg"
        },
        {
          "size": "extralarge",
          "url": "https://lastfm.freetls.fastly.net/i/u/300x300/885a4f992b02a38b33adf88886ca4234.jpg"
        }
      ],
      "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB/_/%E3%81%B2%E3%81%8B%E3%82%8A",
      "username": "Mexdeep",
      "nowplaying": true
    },
    "details": {
      "recent": {
        "data": {
          "meta": {
            "page": "1",
            "total": "22337",
            "user": "Mexdeep",
            "perPage": "1",
            "totalPages": "22337"
          },
          "tracks": [
            {
              "artist": {
                "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB",
                "mbid": "",
                "image": [
                  {
                    "size": "small",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  },
                  {
                    "size": "medium",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  },
                  {
                    "size": "large",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  },
                  {
                    "size": "extralarge",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
                  }
                ],
                "name": "ひかりのなかに"
              },
              "mbid": "",
              "image": [
                {
                  "size": "small",
                  "url": "https://lastfm.freetls.fastly.net/i/u/34s/885a4f992b02a38b33adf88886ca4234.jpg"
                },
                {
                  "size": "medium",
                  "url": "https://lastfm.freetls.fastly.net/i/u/64s/885a4f992b02a38b33adf88886ca4234.jpg"
                },
                {
                  "size": "large",
                  "url": "https://lastfm.freetls.fastly.net/i/u/174s/885a4f992b02a38b33adf88886ca4234.jpg"
                },
                {
                  "size": "extralarge",
                  "url": "https://lastfm.freetls.fastly.net/i/u/300x300/885a4f992b02a38b33adf88886ca4234.jpg"
                }
              ],
              "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB/_/%E3%81%B2%E3%81%8B%E3%82%8A",
              "streamable": "0",
              "album": {
                "mbid": "",
                "name": "まっすぐなまま でいい"
              },
              "name": "ひかり",
              "loved": "1",
              "nowplaying": "true"
            },
            {
              "mbid": "",
              "loved": "0",
              "artist": {
                "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB",
                "mbid": "",
                "image": [
                  {
                    "size": "small",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  },
                  {
                    "size": "medium",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  },
                  {
                    "size": "large",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  },
                  {
                    "size": "extralarge",
                    "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
                  }
                ],
                "name": "ひかりのなかに"
              },
              "image": [
                {
                  "size": "small",
                  "url": "https://lastfm.freetls.fastly.net/i/u/34s/885a4f992b02a38b33adf88886ca4234.jpg"
                },
                {
                  "size": "medium",
                  "url": "https://lastfm.freetls.fastly.net/i/u/64s/885a4f992b02a38b33adf88886ca4234.jpg"
                },
                {
                  "size": "large",
                  "url": "https://lastfm.freetls.fastly.net/i/u/174s/885a4f992b02a38b33adf88886ca4234.jpg"
                },
                {
                  "size": "extralarge",
                  "url": "https://lastfm.freetls.fastly.net/i/u/300x300/885a4f992b02a38b33adf88886ca4234.jpg"
                }
              ],
              "date": {
                "uts": "1619716422",
                "imf": "29 Apr 2021, 17:13"
              },
              "streamable": "0",
              "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB/_/%E3%81%9D%E3%81%B0%E3%81%AB%E3%81%84%E3%81%9F%E3%81%84%E3%82%93%E3%81%A7%E3%81%99",
              "name": "そばにいたいんです",
              "album": {
                "mbid": "",
                "name": "まっすぐなままでいい"
              }
            }
          ]
        }
      },
      "artist": {
        "successful": false
      },
      "album": {
        "successful": true,
        "data": {
          "name": "まっすぐなままでいい",
          "artist": "ひかりのなか に",
          "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB/%E3%81%BE%E3%81%A3%E3%81%99%E3%81%90%E3%81%AA%E3%81%BE%E3%81%BE%E3%81%A7%E3%81%84%E3%81%84",
          "image": [
            {
              "size": "small",
              "url": "https://lastfm.freetls.fastly.net/i/u/34s/885a4f992b02a38b33adf88886ca4234.png"
            },
            {
              "size": "medium",
              "url": "https://lastfm.freetls.fastly.net/i/u/64s/885a4f992b02a38b33adf88886ca4234.png"
            },
            {
              "size": "large",
              "url": "https://lastfm.freetls.fastly.net/i/u/174s/885a4f992b02a38b33adf88886ca4234.png"
            },
            {
              "size": "extralarge",
              "url": "https://lastfm.freetls.fastly.net/i/u/300x300/885a4f992b02a38b33adf88886ca4234.png"
            },
            {
              "size": "mega",
              "url": "https://lastfm.freetls.fastly.net/i/u/300x300/885a4f992b02a38b33adf88886ca4234.png"
            },
            {
              "size": "",
              "url": "https://lastfm.freetls.fastly.net/i/u/300x300/885a4f992b02a38b33adf88886ca4234.png"
            }
          ],
          "listeners": "104",
          "playcount": "609",
          "userplaycount": "155",
          "tracks": [],
          "tags": []
        }
      },
      "track": {
        "successful": false
      }
    }
  }
  ```
</details>

### getMatchingArtists

Takes two users, a limit on the number of top artists to check, and a time period as specified by Last.FM (this is typed), and returns the matching artists, with playcounts for both users (sorted in the same order as users were input). For this command, the limit is currently hard-capped to 1000. 

<details>
  <summary>Example</summary>
  
  ```ts
  console.log(await lastfm.helper.getMatchingArtists("Mexdeep", "gowon_", 1000, "overall"));
  ```
  
  ```ts
  [{
    "name": "Blume popo",
    "url": "https://www.last.fm/music/Blume+popo",
    "playcount": [
      406,
      1
    ]
  },
  {
    "name": "Bomberfett",
    "url": "https://www.last.fm/music/Bomberfett",
    "playcount": [
      5,
      2
    ]
  },
  {
    "name": "CAT ATE HOTDOGS",
    "url": "https://www.last.fm/music/CAT+ATE+HOTDOGS",
    "playcount": [
      3,
      2
    ]
  },
  {
    "name": "Chai",
    "url": "https://www.last.fm/music/Chai",
    "playcount": [
      1,
      12
    ]
  },
  {
    "name": "Dragdown",
    "url": "https://www.last.fm/music/Dragdown",
    "playcount": [
      10,
      2
    ]
  },
  {
    "name": "Fishborn",
    "url": "https://www.last.fm/music/Fishborn",
    "playcount": [
      36,
      2
    ]
  },
  {
    "name": "Fuki",
    "url": "https://www.last.fm/music/Fuki",
    "playcount": [
      63,
      2
    ]
  },
  {
    "name": "Honningbarna",
    "url": "https://www.last.fm/music/Honningbarna",
    "playcount": [
      60,
      3
    ]
  },
  {
    "name": "Hump Back",
    "url": "https://www.last.fm/music/Hump+Back",
    "playcount": [
      241,
      4
    ]
  },
  {
    "name": "KITANO REM",
    "url": "https://www.last.fm/music/KITANO+REM",
    "playcount": [
      953,
      8
    ]
  },
  {
    "name": "Maki",
    "url": "https://www.last.fm/music/Maki",
    "playcount": [
      8,
      2
    ]
  },
  {
    "name": "Once Human",
    "url": "https://www.last.fm/music/Once+Human",
    "playcount": [
      3,
      2
    ]
  },
  {
    "name": "One Morr Time",
    "url": "https://www.last.fm/music/One+Morr+Time",
    "playcount": [
      99,
      6
    ]
  },
  {
    "name": "Silent Hell",
    "url": "https://www.last.fm/music/Silent+Hell",
    "playcount": [
      91,
      2
    ]
  },
  {
    "name": "TEARS OF TRAGEDY",
    "url": "https://www.last.fm/music/TEARS+OF+TRAGEDY",
    "playcount": [
      148,
      11
    ]
  },
  {
    "name": "Tetora",
    "url": "https://www.last.fm/music/Tetora",
    "playcount": [
      940,
      4
    ]
  },
  {
    "name": "tricot",
    "url": "https://www.last.fm/music/tricot",
    "playcount": [
      39,
      17
    ]
  },
  {
    "name": "Unlucky Morpheus",
    "url": "https://www.last.fm/music/Unlucky+Morpheus",
    "playcount": [
      714,
      29
    ]
  },
  {
    "name": "YONLAPA",
    "url": "https://www.last.fm/music/YONLAPA",
    "playcount": [
      47,
      2
    ]
  },
  {
    "name": "カネヨリマサル",
    "url": "https://www.last.fm/music/%E3%82%AB%E3%83%8D%E3%83%A8%E3%83%AA%E3%83%9E%E3%82%B5%E3%83%AB",
    "playcount": [
      963,
      137
    ]
  },
  {
    "name": "コシモトユイカ",
    "url": "https://www.last.fm/music/%E3%82%B3%E3%82%B7%E3%83%A2%E3%83%88%E3%83%A6%E3%82%A4%E3%82%AB",
    "playcount": [
      111,
      5
    ]
  },
  {
    "name": "コトリア",
    "url": "https://www.last.fm/music/%E3%82%B3%E3%83%88%E3%83%AA%E3%82%A2",
    "playcount": [
      203,
      2
    ]
  },
  {
    "name": "ヌ・シャボンヌ",
    "url": "https://www.last.fm/music/%E3%83%8C%E3%83%BB%E3%82%B7%E3%83%A3%E3%83%9C%E3%83%B3%E3%83%8C",
    "playcount": [
      48,
      5
    ]
  },
  {
    "name": "ひかりのなかに",
    "url": "https://www.last.fm/music/%E3%81%B2%E3%81%8B%E3%82%8A%E3%81%AE%E3%81%AA%E3%81%8B%E3%81%AB",
    "playcount": [
      343,
      2
    ]
  },
  {
    "name": "ヤユヨ",
    "url": "https://www.last.fm/music/%E3%83%A4%E3%83%A6%E3%83%A8",
    "playcount": [
      1798,
      13
    ]
  },
  {
    "name": "中山姫李",
    "url": "https://www.last.fm/music/%E4%B8%AD%E5%B1%B1%E5%A7%AB%E6%9D%8E",
    "playcount": [
      40,
      2
    ]
  },
  {
    "name": "密会と耳鳴り",
    "url": "https://www.last.fm/music/%E5%AF%86%E4%BC%9A%E3%81%A8%E8%80%B3%E9%B3%B4%E3%82%8A",
    "playcount": [
      970,
      9
    ]
  },
  {
    "name": "朝日美穂",
    "url": "https://www.last.fm/music/%E6%9C%9D%E6%97%A5%E7%BE%8E%E7%A9%82",
    "playcount": [
      1,
      2
    ]
  },
  {
    "name": "村瀬真弓",
    "url": "https://www.last.fm/music/%E6%9D%91%E7%80%AC%E7%9C%9F%E5%BC%93",
    "playcount": [
      142,
      16
    ]
  },
  {
    "name": "水咲加奈",
    "url": "https://www.last.fm/music/%E6%B0%B4%E5%92%B2%E5%8A%A0%E5%A5%88",
    "playcount": [
      387,
      2
    ]
  },
  {
    "name": "赤い公園",
    "url": "https://www.last.fm/music/%E8%B5%A4%E3%81%84%E5%85%AC%E5%9C%92",
    "playcount": [
      942,
      8
    ]
  }]
  ```

</details>

### cacheScrobbles

Goes through the scrobbles of an individual user, and returns an event emitter that will return every scrobble the user has made, or every scrobble made after a certain number of scrobbles.

Syntax: `lastfm.helper.cacheScrobbles(user:string, options?:{previouslyCached?:number, parallelCaches?:number})`. user is the user to be cached, previouslyCached is the number of scrobbles already cached (default 0), parallelCaches is the number of parallel requests to make (default 1). Keep in mind that with a count higher than 1, there is no guarantee that the scrobbles arrive in the correct order.

<details>
  <summary>Example</summary>
  
  ```ts
  let scrobbleCacher = await lastfm.helper.cacheScrobbles("Mexdeep");
  
  scrobbleCacher.on("start", (data) => {
    console.log(`Found ${data.count} scrobbles, starting (0/${data.totalPages}).`);
  });
  
  scrobbleCacher.on("data", (data) => {
    database.addScrobblesBulk(data.data);
    console.log(`${data.completedPages}/${data.totalPages} (${(data.progress * 100).toFixed(2)}%)`);
  });
  
  scrobbleCacher.on("close", () => {
    console.log("Caching completed.");
  });
  ```
  
  ```ts
  Found 19017 scrobbles, starting (0/20).
  1/20 (5.00%)
  2/20 (10.00%)
  3/20 (15.00%)
  4/20 (20.00%)
  5/20 (25.00%)
  6/20 (30.00%)
  7/20 (35.00%)
  8/20 (40.00%)
  9/20 (45.00%)
  10/20 (50.00%)
  11/20 (55.00%)
  12/20 (60.00%)
  13/20 (65.00%)
  14/20 (70.00%)
  15/20 (75.00%)
  16/20 (80.00%)
  17/20 (85.00%)
  18/20 (90.00%)
  19/20 (95.00%)
  20/20 (100.00%)
  Caching completed.
  ```
  
  This would send 1000 scrobbles at a time to the database.addScrobblesBulk(). This is returned exactly like the user.getRecentTracks function returns it (except that it does remove nowplaying).

</details>

## Logging

Starting with version 1.3.0, lastfm-typed finally has logging built-in! Currently the logging is built into the main class, not the individual calls. Now, when you initialize the lastfm class you can listen to the `requestStart` and `requestComplete` events to get some basic info on each request made by the library.

**Note:** The response printed is before the processing done by the library. This means the responses will usually not look exactly the same as the proper output, but the same information is still there for debug purposes.

<details>
  <summary>Example</summary>
  
  ```ts
    const lastfm = new LastFMTyped(apiKey:string, options?:{apiSecret?:string, userAgent?:string, secureConnection?:boolean});
    
    lastfm.on("requestStart", (args, HTTPMethod) => {
      console.log("REQUEST START: ", HTTPMethod, args);
    });
    
    lastfm.on("requestComplete", (args, time, res) => {
      console.log("REQUEST COMPLETE: ", args, `Executed in ${time}ms`, res);
    });
    
    const nowplaying = await lastfm.helper.getNowPlaying("Mexdeep", ["artist", "album", "track"]);
  ```
  
  ```js
    REQUEST START:  GET { method: 'user.getRecentTracks', user: 'mexdeep', limit: 1 }
    REQUEST COMPLETE:  { method: 'user.getRecentTracks', user: 'mexdeep', limit: 1 } Executed in 563ms {
      recenttracks: {
        '@attr': {
          page: '1',
          total: '22243',
          user: 'Mexdeep',
          perPage: '1',
          totalPages: '22243'
        },
        track: [ [Object], [Object] ]
      }
    }
    REQUEST START:  GET { method: 'artist.getInfo', artist: '聴色', username: 'mexdeep' }
    REQUEST START:  GET {
      method: 'album.getInfo',
      artist: '聴色',
      album: 'さよならを交わすとき',
      username: 'mexdeep'
    }
    REQUEST START:  GET {
      method: 'track.getInfo',
      artist: '聴色',
      track: '会者定離',
      username: 'mexdeep'
    }
    REQUEST COMPLETE:  {
      method: 'track.getInfo',
      artist: '聴色',
      track: '会者定離',
      username: 'mexdeep'
    } Executed in 393ms {
      track: {
        name: '会者定離',
        url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2/_/%E4%BC%9A%E8%80%85%E5%AE%9A%E9%9B%A2',
        duration: '242000',
        streamable: { '#text': '0', fulltrack: '0' },
        listeners: '2',
        playcount: '7',
        artist: { name: '聴色', url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2' },
        album: {
          artist: 'Various Artists',
          title: 'スクールズアウト2018 コンピレーション',
          url: 'https://www.last.fm/music/Various+Artists/%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%AB%E3%82%BA%E3%82%A2%E3%82%A6%E3%83%882018+%E3%82%B3%E3%83%B3%E3%83%94%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3',
          image: [Array]
        },
        userplaycount: '13',
        userloved: '1',
        toptags: { tag: [] }
      }
    }
    REQUEST COMPLETE:  { method: 'artist.getInfo', artist: '聴色', username: 'mexdeep' } Executed in 400ms {
      artist: {
        name: '聴色',
        url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2',
        image: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
        streamable: '0',
        ontour: '0',
        stats: { listeners: '5', playcount: '345', userplaycount: '335' },
        similar: { artist: [] },
        tags: { tag: [] },
        bio: {
          links: [Object],
          published: '01 Jan 1970, 00:00',
          summary: ' <a href="https://www.last.fm/music/%E8%81%B4%E8%89%B2">Read more on Last.fm</a>',
          content: ''
        }
      }
    }
    REQUEST COMPLETE:  {
      method: 'album.getInfo',
      artist: '聴色',
      album: 'さよならを交わすとき',
      username: 'mexdeep'
    } Executed in 477ms {
      album: {
        name: 'さよならを交わすとき',
        artist: '聴色',
        url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2/%E3%81%95%E3%82%88%E3%81%AA%E3%82%89%E3%82%92%E4%BA%A4%E3%82%8F%E3%81%99%E3%81%A8%E3%81%8D',
        image: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
        listeners: '3',
        playcount: '50',
        userplaycount: '335',
        tracks: { track: [] },
        tags: { tag: [] }
      }
    }
  ```
  
</details>