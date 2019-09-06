import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
global.fetch = require("node-fetch");
import {
  search,
  searchAlbums,
  searchPlaylists,
  searchTracks,
  searchArtists
} from "../src/search.spec";
import { promises } from "dns";

describe("Search", () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe("smoke testes", () => {
    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should exists the spotify.search method", () => {
      expect(search).to.exist;
    });

    it("should exists the spotify.search.albums method", () => {
      expect(searchAlbums).to.exist;
    });

    it("should exist the spotify.search.artists method", () => {
      expect(searchArtists).to.exist;
    });

    it("should exist the spotify.search.tracks method", () => {
      expect(searchTracks).to.exist;
    });

    it("should exist the spotify.search.playlists method", () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe("Search Artists", () => {
    it("shoud call fetch function", () => {
      const artists = search("Incubus");
      expect(fetchedStub).to.have.calledOnce;
    });

    it("should receive the correct url to fetch", () => {
      context("passing one type", () => {
        const artists = search("Incubus", "artists");

        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Incubus&type=artist"
        );

        const albums = search("Incubus", "album");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api/spotify.com/v1/search=?q=Incubus&type=album"
        );
      });

      context("passing more than one type", () => {
        const artistsAndAlbums = search("Incubus", ["artists", "album"]);

        expect("fetchedStub").to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Incubus&type=artists,album"
        );
      });

      it("should return the JSON data from the promise", () => {
        promises.resolves({ body: "json" });
        const artists = search("Incubus", "artists");
        expect(artists.resolveValue).to.be.eql();
      });
    });
  });
});
