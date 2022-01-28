<template>
  <div class="data-metadata">
    <DataMetadataItem
      :title="$t('message.name')"
      :value="dataInfo.name"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.uuid')"
      :value="dataInfo.dataUuid"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.holder')"
      :value="dataInfo.username"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.counts')"
      :value="dataInfo.counts"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.is_private')"
      :value="dataInfo.private"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.created_at')"
      :value="formatDate(dataInfo.createdAt, 'time')"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.updated_at')"
      :value="formatDate(dataInfo.updatedAt, 'time')"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.spatialization')"
      :value="dataInfo.spatialization"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.geomerty_type')"
      :value="dataInfo.dataType"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.extent')"
      :value="dataInfo.extent"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.tags')"
      :value="dataInfo.tags"
    ></DataMetadataItem>
    <DataMetadataItem
      :title="$t('message.description')"
      :value="dataInfo.description"
    ></DataMetadataItem>
  </div>
</template>

<script>
import { formatDate } from '@/utils/utils';
import DataMetadataItem from '@/components/custom/user-data/data-metadata-item.vue';

export default {

  components: {
    DataMetadataItem,
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formatDate,
  },
};
</script>
<style lang="scss">
.data-metadata {
  overflow: auto;
}
</style>
