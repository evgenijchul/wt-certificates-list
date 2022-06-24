<script>
import { ref, onMounted } from "vue";
import vueChocolat from "vue-chocolat";
import { api } from "./api";
import WtLoader from "./components/Loader.vue";

export default {
  components: {
    "vue-chocolat": vueChocolat,
    "wt-loader": WtLoader,
  },

  setup() {
    let sertificates = ref([]);
    let isLoading = ref(true);
    let isSertForElement = ref(false);

    onMounted(async () => {
      try {
        const ELEMENT_CODE_ON_PAGE =
          document.getElementsByName("ELEMENT_CODE")[0]?.value;
        if (ELEMENT_CODE_ON_PAGE) {
          isSertForElement.value = true;
        }

        const { ELEMENTS } = isSertForElement.value
          ? await api.getCertificates(ELEMENT_CODE_ON_PAGE)
          : await api.getCertificates();

        if (ELEMENTS?.length) {
          sertificates.value = ELEMENTS;
        }
      } catch (_) {
        // prevent error
      } finally {
        isLoading.value = false;
      }
    });

    return {
      sertificates,
      isLoading,
      isSertForElement,
    };
  },
};
</script>

<template>
  <wt-loader v-if="isLoading" />

  <vue-chocolat
    v-if="!isLoading && sertificates?.length"
    :class="{ 'element-template': isSertForElement }"
  >
    <a
      v-for="element in sertificates"
      :href="element.DETAIL_PICTURE?.SRC"
      :title="element.PREVIEW_TEXT || element.NAME"
      :key="element.ID"
    >
      <img
        :src="element.DETAIL_PICTURE?.SRC"
        :alt="element.NAME"
        style="max-width: 300px"
      />
    </a>
  </vue-chocolat>
</template>

<style scoped>
.element-template > a > img {
  max-width: 100px;
}
</style>

// Rewrite vue-chocolat style
<style>
.chocolat-wrapper {
  z-index: 2147483647;
}

.chocolat-wrapper .chocolat-bottom {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px !important;
  color: rgb(0, 0, 0) !important;
  background-color: rgb(255, 199, 0) !important;
}

.vue-chocolat > a > img {
  padding: 7px;
}
</style>
