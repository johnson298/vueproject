<template>
  <div>
    <label class="vs-input--label">{{ text }} *</label>
    <vue-simple-suggest
      v-model="selectedData"
      mode="select"
      ref="suggestComponentPrograms"
      placeholder="Search information..."
      value-attribute="id"
      display-attribute="name"
      :list="getDataRespon"
      :debounce="200"
      :filter-by-query="false"
      @select="onSuggestSelect"
    >
      <div class="g">
        <input type="text" placeholder="Search information..." />
      </div>
      <template slot="misc-item-above" slot-scope="{ suggestions, query }">
        <div class="misc-item">
          <span>You're searching for '{{ query }}'.</span>
        </div>

        <template v-if="suggestions.length > 0">
          <div class="misc-item">
            <span>{{ suggestions.length }} suggestions are shown...</span>
          </div>
          <hr />
        </template>

        <div class="misc-item" v-else-if="!loading">
          <span>No results</span>
        </div>
      </template>

      <div slot="suggestion-item" slot-scope="{ suggestion, query }">
        <div class="text">
          <span>{{ suggestion.name | truncate(40) }}</span>
        </div>
      </div>

      <div
        class="misc-item"
        slot="misc-item-below"
        slot-scope="{ suggestions }"
        v-if="loading"
      >
        <span>Loading...</span>
      </div>
    </vue-simple-suggest>
    <small class="text-warning">
      - {{ text }} được chọn:
      <span v-if="selectedData" class="text-dark" key="checkSelected">{{
        selected.name
      }}</span>
      <span v-else-if="data" class="text-dark" key="checkSelected">
        {{ data.name }}
      </span>
      <span key="checkSelected" class="text-danger" v-else>Chưa chọn !</span>
    </small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      selectedData: null,
      selected: null
    };
  },
  props: {
    text: {
      type: String,
      required: true
    },
    linkApi: {
      type: String,
      required: true
    },
    getAttribute: {
      default: "",
      type: String
    },
    data: {
      required: false
    }
  },
  methods: {
    onSuggestSelect(suggest) {
      if (suggest) {
        this.selected = suggest;
        this.selectedData = this.getAttribute ? suggest[this.getAttribute] : suggest;
        this.$emit("update:change", this.selectedData);
      }
    },
    getDataRespon(search = "") {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http
          .get(this.linkApi, {
            params: {
              search: search
            }
          })
          .then(function(response) {
            resolve(response.data.data);
          })
          .catch(e => {
            vm.loading = false;
            reject(e);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
