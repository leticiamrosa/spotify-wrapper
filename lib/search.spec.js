"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var search = exports.search = function search(query, type) {
  fetch("https://api.spotify.com/v1/search?q=" + query + "&type=" + type).then(function (data) {
    return data.json();
  });
};
var searchAlbums = exports.searchAlbums = function searchAlbums() {};

var searchArtists = exports.searchArtists = function searchArtists(query) {
  search(query, "artist");
};
var searchTracks = exports.searchTracks = function searchTracks() {};
var searchPlaylists = exports.searchPlaylists = function searchPlaylists() {};