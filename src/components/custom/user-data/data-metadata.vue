<template>
  <div class="data-metadata">
    <DataMetadataItem
      :title="$t('message.name')"
      :value="dataInfo.name"
    />
    <DataMetadataItem
      :title="$t('message.uuid')"
      :value="dataInfo.dataUuid"
    />
    <DataMetadataItem
      :title="$t('message.holder')"
      :value="dataInfo.username"
    />
    <DataMetadataItem
      :title="$t('message.counts')"
      :value="dataInfo.counts"
    />
    <DataMetadataItem
      :title="$t('message.is_private')"
      :value="dataInfo.private"
    />
    <DataMetadataItem
      :title="$t('message.created_at')"
      :value="formatDate(dataInfo.createdAt, 'time')"
    />
    <DataMetadataItem
      :title="$t('message.updated_at')"
      :value="formatDate(dataInfo.updatedAt, 'time')"
    />
    <DataMetadataItem
      :title="$t('message.spatialization')"
      :value="dataInfo.spatialization"
    />
    <DataMetadataItem
      :title="$t('message.geomerty_type')"
      :value="dataInfo.dataType"
    />
    <DataMetadataItem
      :title="$t('message.extent')"
      :value="dataInfo.extent"
    />
    <DataMetadataItem
      :title="$t('message.tags')"
      :value="dataInfo.tags"
    />
    <DataMetadataItem
      :title="$t('message.description')"
      :value="dataInfo.description"
    />
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/utils';
import DataMetadataItem from '@/components/custom/user-data/data-metadata-item.vue';

defineProps({
  dataInfo: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="scss">
.data-metadata {
  overflow: auto;
}
</style>
