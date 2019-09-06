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
    fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe("smoke tests", () => {
    it("should exist the spotify.search.albums method", () => {
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

  describe("searchArtists", () => {
    it("should call fetch function", () => {
      const artists = searchArtists("Incubus");
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call fetch with the correct URL", () => {
      const artists = searchArtists("Incubus");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=Incubus&type=artist"
      );

      const artists2 = searchArtists("Muse");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=Muse&type=artist"
      );
    });
  });
});
