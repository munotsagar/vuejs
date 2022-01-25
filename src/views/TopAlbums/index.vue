<template>
  <h1>
    <a :href="feedAuthorUrl">{{ feedAuthorName }}</a>
  </h1>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Album Name</th>
        <th scope="col">Album Thumbnail</th>
        <th scope="col">Price</th>
        <th scope="col">Release Date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody v-if="topAlbums.length > 0">
      <tr v-for="(item, index) in topAlbums" :key="index">
        <th>{{ index + 1 }}</th>
        <td>{{ item["im:name"]["label"] }}</td>
        <td>
          <div v-if="item['im:image'][0]">
            <img
              :height="item['im:image'][0]['attributes']['height']"
              :src="item['im:image'][0]['label']"
            />
          </div>
        </td>
        <td>{{ item["im:price"]["label"] }}</td>
        <td>{{ item["im:releaseDate"]["attributes"]["label"] }}</td>
        <td>
          <router-link :to="`/topalbums/${item['id']['attributes']['im:id']}`"
            >View</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
export default {
  name: "TopAlbums",
  data() {
    return {
      topAlbumsUrl: "https://itunes.apple.com/us/rss/topalbums/limit=100/json",
      feedAuthorName: "",
      feedAuthorUrl: "",
      responseData: {},
      topAlbums: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.feedAuthorName = "Test Data";

      axios.get(this.topAlbumsUrl).then((response) => {
        this.responseData = response.data.feed;
        this.feedAuthorName = response.data.feed.author.name.label;
        this.feedAuthorUrl = response.data.feed.author.uri.label;
        this.topAlbums = response.data.feed.entry;
        console.log(this.topAlbums.length);
      });
    },
  },
};
</script>
