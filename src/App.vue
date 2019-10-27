<template>
  <v-app>
  <v-btn v-if="data" @click="filterItems(criteria)">Click Me</v-btn>
  <div
	v-for="(obj,key) in criteria"
	:key="key"
  >
	<v-checkbox 
		v-for="(item,index) in obj.values"
		:key="index"
		v-model="selected" 
		:label="item" 
		:value="item"
	>
	</v-checkbox>
  </div>
  </v-app>
</template>

<script>
const d3 = require('d3')

export default {
  name: 'App',

  data: () => ({
	data:null,
	criteria:[
		{
			name: 'Status',
			prop: 'Status',
			values: [],
		},
		{
			name: 'Before & After',
			prop: 'Before/After',
			values: [],
		},
	],
	filteredValues: [],
	selected: null,
  }),
  	computed: {
	},
	methods: {

		filterItems(criteria) {
			console.log('crit',criteria);
			var result = this.data.filter(item => {
				return criteria.every(c => {
					var value = item[c.prop];
					if (typeof value === 'object') { 
						return this.filteredValues.length==value.length && 
								this.filteredValues.every(function(v,i){return v==value[i];});
					}
					else
						return this.filteredValues.indexOf(value) > -1;
				})
			})
			console.log('Results',result);
		},
  },
	mounted() {
		d3.csv('./data.csv').then(data => {
			console.log('data',data);
			this.data = data;
			let allValues = [];
			let uniq;
			for (let i = 0; i < this.criteria.length; i++) {
				uniq = [...new Set(data.map(item => item[this.criteria[i].prop]))];
				this.criteria[i].values = uniq
				allValues.push(uniq)
			}
			this.selected = allValues.flat()
		})
	},
  watch: {

	  selected(val) {
		this.filteredValues = val
	  }
  }

};
</script>

<style lang="scss">

html {
//	overflow: hidden !important;
}

</style>