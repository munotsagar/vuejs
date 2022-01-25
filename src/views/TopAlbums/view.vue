<template>
  <h3>
    {{ albumData.name }}
  </h3>
  <table class="table">
    <tbody>
      <tr>
        <td scope="col" class="text-right">Album Name :</td>
        <td scope="col" class="text-left">
          {{ albumData.name }}
        </td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Album Type :</td>
        <td scope="col" class="text-left">
          {{ albumData.type }}
        </td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Album Link :</td>
        <td scope="col" class="text-left">
          <a :href="albumData.link" target="_blank">{{ albumData.link }} </a>
        </td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Price :</td>
        <td scope="col" class="text-left">{{ albumData.price }}</td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Total Count :</td>
        <td scope="col" class="text-left">{{ albumData.totalCount }}</td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Release Date :</td>
        <td scope="col" class="text-left">{{ albumData.releaseDate }}</td>
      </tr>

      <tr>
        <td scope="col" class="text-right">Thumbnail Image :</td>
        <td scope="col" class="text-left">
          <div v-if="albumData.thumbnailImage">
            <img
              :height="albumData.thumbnailImageHeight"
              :src="albumData.thumbnailImage"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Medium Image :</td>
        <td scope="col" class="text-left">
          <div v-if="albumData.mediumImage">
            <img
              :height="albumData.mediumImageHeight"
              :src="albumData.mediumImage"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td scope="col" class="text-right">Large Image :</td>
        <td scope="col" class="text-left">
          <div v-if="albumData.largeImage">
            <img
              :height="albumData.largeImageHeight"
              :src="albumData.largeImage"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
export default {
  name: "TopAlbumsView",
  data() {
    return {
      albumIndex: this.$route.params.id,
      topAlbumsUrl: "https://itunes.apple.com/us/rss/topalbums/limit=100/json",
      responseData: {},
      topAlbums: {},
      albumData: {
        name: "",
        type: "",
        price: "",
        totalCount: "",
        releaseDate: "",
        category: "",
        artist: "",
        rights: "",
        link: "",
        thumbnailImage: "",
        thumbnailImageHeight: "",
        mediumImage: "",
        mediumImageHeight: "",
        largeImage: "",
        largeImageHeight: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(this.topAlbumsUrl).then((response) => {
        this.responseData = response.data.feed;
        this.topAlbums = response.data.feed.entry;
        const albumIndex = this.albumIndex;
        const viewAlbum = response.data.feed.entry.filter(function (elem) {
          if (elem["id"]["attributes"]["im:id"] == albumIndex) return elem;
        })[0];
        console.log(viewAlbum);
        this.albumData.name = viewAlbum["title"]["label"];
        this.albumData.type =
          viewAlbum["im:contentType"]["attributes"]["label"];
        this.albumData.price = viewAlbum["im:price"]["label"];
        this.albumData.totalCount = viewAlbum["im:itemCount"]["label"];
        this.albumData.releaseDate =
          viewAlbum["im:releaseDate"]["attributes"]["label"];
        this.albumData.category = viewAlbum["category"]["attributes"]["label"];
        this.albumData.artist = viewAlbum["im:artist"]["label"];
        this.albumData.rights =
          viewAlbum["im:releaseDate"]["attributes"]["label"];
        this.albumData.link = viewAlbum["link"]["attributes"]["href"];

        this.albumData.thumbnailImage = viewAlbum["im:image"][0]["label"];
        this.albumData.thumbnailImageHeight =
          viewAlbum["im:image"][0]["attributes"]["height"];
        this.albumData.mediumImage = viewAlbum["im:image"][1]["label"];
        this.albumData.mediumImageHeight =
          viewAlbum["im:image"][1]["attributes"]["height"];
        this.albumData.largeImage = viewAlbum["im:image"][2]["label"];
        this.albumData.largeImageHeight =
          viewAlbum["im:image"][2]["attributes"]["height"];
      });
    },
  },
};
</script>
