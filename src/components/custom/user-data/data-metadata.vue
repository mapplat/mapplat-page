<template>
  <div class="data-metadata">
    <DataMetadataItem :title="_t('message.name')" :value="dataInfo.name"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.uuid')" :value="dataInfo.dataUuid"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.holder')" :value="dataInfo.username"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.counts')" :value="dataInfo.counts"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.is_private')" :value="dataInfo.private"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.created_at')" :value="formatDate(dataInfo.createdAt, 'time')"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.updated_at')" :value="formatDate(dataInfo.updatedAt, 'time')"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.spatialization')" :value="dataInfo.spatialization"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.geomerty_type')" :value="dataInfo.dataType"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.extent')" :value="dataInfo.extent"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.tags')" :value="dataInfo.tags"></DataMetadataItem>
    <DataMetadataItem :title="_t('message.description')" :value="dataInfo.description"></DataMetadataItem>
  </div>
</template>

<script>
import DataMetadataItem from './data-metadata-item';

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
};
</script>
<style lang="scss">
.data-metadata {
  overflow: auto;
}
</style>
