<template>
  <div id="wall">
    <div class="map-wrapper">
      <h2 v-if="province" class="province-title">{{ province.properties.name }}</h2>
      <div v-if="currentProvince" class="province-info">
        <h3 class="text-center">{{ currentProvince.name }}</h3>
        <ul>
          <li>id: {{ currentProvince.id }}</li>
          <!-- <li>slug: {{ currentProvince.slug }}</li> -->
        </ul>
      </div>
      <svg></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as d3geo from 'd3-geo-projection';
import 'd3-selection-multi';
import * as datamaps from '@/utils/datamaps.world';
import worldMap from '@/utils/worldMap.geo';
import countries from '@/utils/countries.geo';
import meteorites from '@/utils/meteorite-strike-data';
import indonesia from '@/utils/indonesia.geojson';
import tw from '@/utils/taiwan';
export default {
  data() {
    return {
      // g: null,
      // geojson: [],
      // width: 2000,
      // height: 1000,
      path: null,
      color: null,
      size: null,
      mapLayer: null,
      centered: undefined,
      province: undefined,
      currentProvince: undefined,
    };
  },

  mounted() {
    this.initialize();
  },
  methods: {
    // initialize

    initialize() {
      // response.data = response.data.map(function(obj) {
      //   console.log(obj.key);
      //   return rObj;
      // });
      // this.getAirports();
      // this.getTrimCounty();
      // console.log(trimCounty);
      // this.geojson = countries;
      // console.log(this.geojson);
      // this.initSvg();

      this.initSvg2();
    },
    initSvg2() {
      let self = this;
      // Set svg width & height
      self.centered = undefined;
      const mapCenter = {
        lat: 1.4,
        lng: 117.5,
      };
      self.size = {
        height: 900,
        width: d3
          .select('.map-wrapper')
          .node()
          .getBoundingClientRect().width,
      };

      self.color = d3
        .scaleLinear()
        .domain([1, 20])
        .clamp(true)
        .range(['#08304b', '#08304b']);

      // const projection = d3.geoEquirectangular().scale(1400);
      // .center([mapCenter.lng, mapCenter.lat])
      // .translate([self.size.width / 2, self.size.height / 2]);

      const projection = d3
        .geoEquirectangular()
        .scale(250)
        .translate([self.size.width / 2, self.size.height / 2]);

      self.path = d3.geoPath().projection(projection);

      const svg = d3
        .select('svg')
        .attr('width', self.size.width)
        .attr('height', self.size.height)
        .call(
          d3.zoom().on('zoom', function() {
            g.attr('transform', d3.event.transform);
          })
        );
      // Add background

      svg
        .append('rect')
        .attr('class', 'background')
        .attr('width', self.size.width)
        .attr('height', self.size.height)
        .on('click', self.clicked);
      const g = svg.append('g');
      const effectLayer = g.append('g').classed('effect-layer', true);
      self.mapLayer = g.append('g').classed('map-layer', true);

      // Load map data
      // const geoJsonUrl = 'https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson';
      // d3.json(geoJsonUrl, function(error, mapData) {
      // let features = indonesia.features;

      let features = countries.features;
      console.log(features);
      //  let features = worldMap.geometries
      // Update color scale domain based on data
      self.color.domain([0, d3.max(features, self.nameLength)]);
      // Draw each province as a path
      self.mapLayer
        .selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', self.path)
        .attr('vector-effect', 'non-scaling-stroke')
        // .style('fill', self.fillFn())
        .style('fill', '#021019')
        .style('stroke', '#4393c3')
        .on('mouseover', function(d) {
          d3.select(this).style('fill', 'rgba(67, 147, 195,0.3)');
          if (d) {
            self.selectProvince(d);
          }
        })
        .on('mouseout', function(d) {
          self.selectProvince(undefined);
          // Reset province color
          self.mapLayer.selectAll('path').style('fill', (d) => {
            return self.centered && d === self.centered ? '#4393c3' : '#021019';
          });
        })
        .on('click', self.clicked);
    },
    fillFn(d) {
      // console.log('fillFn');
      return this.color(this.nameLength(d));
    },
    selectProvince(province) {
      this.province = province;
    },
    openInfo(province) {
      this.currentProvince = province;
    },
    closeInfo() {
      this.currentProvince = undefined;
    },

    clicked(d) {
      let self = this;
      var x, y, k;

      // Compute centroid of the selected path
      if (d && self.centered !== d) {
        var centroid = self.path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        self.centered = d;
        self.openInfo(d);
      } else {
        x = self.size.width / 2;
        y = self.size.height / 2;
        k = 1;
        self.centered = null;
        self.closeInfo();
      }

      // Highlight the clicked province
      self.mapLayer.selectAll('path').style('fill', function(d) {
        return self.centered && d === self.centered ? '#4393c3' : '#021019';
      });
    },
    mouseover(d) {
      // Highlight hovered province
      d3.select(this).style('fill', '#021019');

      if (d) {
        this.selectProvince(d.properties);
      }
    },
    mouseout(d) {
      this.selectProvince(undefined);
      // Reset province color
      this.mapLayer.selectAll('path').style('fill', (d) => {
        return this.centered && d === this.centered ? '#2A312A' : this.fillFn(d);
      });
    },
    nameLength(d) {
      // console.log('nameLength');
      const n = this.nameFn(d);
      return n ? n.length : 0;
    },
    nameFn(d) {
      // console.log('nameFn');
      return d && d.properties ? d.properties.name : null;
    },

    // !-------------------------------------------------------------------------------------
    initSvg1() {
      // var color = d3.scaleOrdinal().range(d3.schemeCategory20);
      const svg = d3
        .select('#wall')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .call(d3.zoom().on('zoom', this.zoomed));
      this.g = svg.append('g');
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
      const projection = d3
        .geoEquirectangular()
        .scale(200)
        .translate([this.width / 2, this.height / 2]);
      const path = d3
        .geoPath()
        .projection(projection)
        .pointRadius((d) => Math.sqrt(d.properties.mass) / 100);

      // d3.json(this.worldMapURL, function(error, world) {
      //   console.log(world);
      //   if (error) return console.error(error);

      //   d3.json(this.meteoriteDataURL, function(error, meteorites) {
      //     if (error) return console.error(error);

      meteorites.features.sort(function(a, b) {
        return b.properties.mass - a.properties.mass;
      });

      this.g
        .selectAll('.border')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'border')
        .attr('d', path)
        .style('stroke', 'white')
        .style('fill', 'white');

      this.g
        .selectAll('.meteorite')
        .data(meteorites.features)
        .enter()
        .append('path')
        .attr('class', 'meteorite')
        .attr('d', path)
        .style('stroke', 'steelblue')
        .style('fill', 'steelblue')
        .style('opacity', '0.8')
        .on('mouseover', function(d) {
          d3.select(this)
            .style('fill', 'red')
            .style('stroke', 'red');
          tooltip
            .style('opacity', 0.8)
            .html(
              'Name: ' +
                d.properties.name +
                '<br />Mass: ' +
                d.properties.mass +
                '<br />Year: ' +
                d.properties.year.slice(0, 4)
            )
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px');
        })
        .on('mouseout', function(d) {
          d3.select(this)
            .style('stroke', 'steelblue')
            .style('fill', 'steelblue');
          tooltip.style('opacity', 0);
        });
      //   });
      // });
      // const projection = d3
      //   .geoMercator()
      //   .center(this.center)
      //   .scale(10000);

      // const path = d3.geoPath().projection(projection);
      // const map = d3
      //   .select('g')
      //   .selectAll('path')
      //   .data(this.geojson.features)
      //   .enter()
      //   .append('path')
      //   .attr('d', path)
      //   .attr('stroke', 'black')
      //   .attr('stroke-width', '1')
      //   .attr('fill', '#184200')
      //   .on('mouseover', function(d, i) {
      //     d3.select(this).attr('fill', '#ddd');
      //     this.title = d.properties['COUNTYNAME'];
      //     console.log(this.title);
      //   })
      //   .on('mouseleave', function(d) {
      //     d3.select(this).attr('fill', '#184200');
      //     this.title = '臺灣';
      //   });
    },
    zoomed() {
      this.g.attr('transform', d3.event.transform);
    },
  },
};
</script>
<style lang="scss">
#wall {
  height: 100%;
  background: #222;
}

.map-wrapper {
  .province-title {
    position: absolute;
    top: 50px;
    left: 150px;
    color: white;
  }
  .province-info {
    background: white;
    position: absolute;
    top: 150px;
    right: 20px;
    height: 400px;
    width: 300px;
  }
  .background {
    fill: #021019;
    pointer-events: all;
  }
  .map-layer {
    fill: #08304b;
    stroke: #021019;
    stroke-width: 1px;
  }
}
/* h1 {
  text-align: center;
  margin: 1em 0;
  font-weight: normal;
}

.tooltip {
  position: absolute;
  text-align: center;
  font-size: 0.8em;
  border-radius: 1em;
  padding: 1em;
  pointer-events: none;
  background-color: #222;
  color: #fff;
}

svg {
  border-style: solid;
  border-color: white;
  border-width: 1px;
} */
</style>
