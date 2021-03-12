<template>
  <div id="map-wrapper">
  </div>
</template>

<script>
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transformExtent } from 'ol/proj';

const token = localStorage.getItem('token');
export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    transform(extent) {
      return transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
    },
    initMap() {
      const { dataUuid, extent } = this.dataInfo;
      const viewConf = {
        center: [0, 0],
        zoom: 1,
      };
      if (extent) {
        viewConf.extent = this.transform(extent.split(','));
      }

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
              url: `http://mapplat.localhost/api/data/${dataUuid}/tile/{z}/{x}/{y}@2x.png?token=${token}`,
            }),
          }),
        ],
      });
      olMap.getView().fit(this.transform(extent.split(',')));
    },
  },
};
</script>
<style lang="scss">
#map-wrapper {
  background-color: #4b4e56;
}
</style>
