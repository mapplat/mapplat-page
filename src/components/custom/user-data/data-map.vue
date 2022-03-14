<template>
  <div id="map-wrapper" />
</template>

<script setup>
import { nextTick } from 'vue';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transformExtent } from 'ol/proj';
import { SERVER_HOST } from '@/env';
import { getToken } from '@/utils/utils';

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {},
  },
});

const transform = (extent) => transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
const initMap = () => {
  const { dataUuid, extent } = props.dataInfo;
  const viewConf = {
    center: [0, 0],
    zoom: 1,
  };
  if (!extent) return;
  viewConf.extent = transform(extent.split(','));

  const olMap = new Map({
    target: 'map-wrapper',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        }),
      }),
      new TileLayer({
        source: new XYZ({
          url: `${SERVER_HOST}/data/${dataUuid}/tile/{z}/{x}/{y}@1x.png?token=${getToken()}`,
        }),
      }),
    ],
  });
  olMap.getView().fit(transform(extent.split(',')));
};

nextTick(() => {
  initMap();
});
</script>
<style lang="scss">
#map-wrapper {
  background-color: #4b4e56;
}
</style>
