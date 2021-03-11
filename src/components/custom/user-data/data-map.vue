<template>
  <div id="map-wrapper">
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
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
        zoom: 2,
      };
      if (extent) {
        viewConf.extent = this.transform(extent.split(','));
      }

      // eslint-disable-next-line no-new
      new Map({
        target: 'map-wrapper',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: `http://mapplat.localhost/api/data/${dataUuid}/tile/{z}/{x}/{y}@2x.png?token=${token}`,
            }),
          }),
        ],
        view: new View(viewConf),
      });
    },
  },
};
</script>
<style lang="scss">
#map-wrapper {
  background-color: #4b4e56;
}
</style>
