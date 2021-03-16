<template>
  <div class="data-metadata">
    <DataMetadataItem title="名称" :value="dataInfo.name"></DataMetadataItem>
    <DataMetadataItem title="uuid" :value="dataInfo.dataUuid"></DataMetadataItem>
    <DataMetadataItem title="所有人" :value="dataInfo.username"></DataMetadataItem>
    <DataMetadataItem title="数量" :value="dataInfo.counts"></DataMetadataItem>
    <DataMetadataItem title="私有数据" :value="dataInfo.private"></DataMetadataItem>
    <DataMetadataItem title="创建时间" :value="formatDate(dataInfo.createdAt, 'time')"></DataMetadataItem>
    <DataMetadataItem title="更新时间" :value="formatDate(dataInfo.updatedAt, 'time')"></DataMetadataItem>
    <DataMetadataItem title="空间化" :value="dataInfo.spatialization"></DataMetadataItem>
    <DataMetadataItem title="空间类型" :value="dataInfo.dataType"></DataMetadataItem>
    <DataMetadataItem title="地理范围" :value="dataInfo.extent"></DataMetadataItem>
    <DataMetadataItem title="标签" :value="dataInfo.tags"></DataMetadataItem>
    <DataMetadataItem title="描述" :value="dataInfo.description"></DataMetadataItem>
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
