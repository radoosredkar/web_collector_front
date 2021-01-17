<template>
		<div id="homes-table">
				<input placeholder="filter by description, title, source" v-model="filter">
				<input placeholder="price from" v-model="filter_price_from">
				<input placeholder="price from" v-model="filter_price_to">
				<input type="button" value="refresh" v-on:click="$emit('refresh')">
				<table class="zui-table">
						<thead>
								<tr>
										<th v-on:click="sortAsc('id')">#</th>
										<th v-on:click="sortAsc('title')">Title</th>
										<th>Description</th>
										<th v-on:click="sortAsc('price')">Price</th>
										<th>image</th>
										<th>Source</th>
										<th v-on:click="sortAsc('dateCreated')">Date Created</th>
										<th v-on:click="sortAsc('dateFound')">Last Found Date</th>
								</tr>
						</thead>
						<tbody>
								<tr v-for="home in sortedHomes ">
										<td>{{home.id}}</td>
										<td>{{home.title}}</td>
										<td>{{home.description}}</td>
										<td>{{formatNumber(home.price)}}</td>
										<td>
												<a target="__blank__" :href="home.advUrl">
														<img :src="home.image" class="image">
												</a>
										</td>
										<td>{{home.source}}</td>
										<td>{{home.dateCreated}}</td>
										<td>{{home.dateFound}}</td>
								</tr>
						</tbody>
				</table>
		</div>
</template>

<script>
export default {
		name: 'homes-table',
		props: {
				homes:Array
		},
		data() {
				return {
						filter:'',
						filter_price_from:null,
						filter_price_to:null,
						sortBy:'',
						sortDir:1,
						sortedHomesHandler:Array
				}
		},
		computed: {	
				sortedHomes: function() {
						if (this.sortBy){
								this.sortedHomesHandler = this.homes.sort((a,b)=>{
										if (this.sortBy == 'dateFound' || this.sortBy == 'dateCreated') {
												return Date.parse(a[this.sortBy])>Date.parse(b[this.sortBy]) * this.sortDir;
										} else {
												return a[this.sortBy]>b[this.sortBy] * this.sortDir;
										}
								});
						}else {
								this.sortedHomesHandler = this.homes;
						}
						if (this.sortedHomesHandler && (this.filter || this.filter_price_from || this.filter_price_to)){
								var price_from = this.filter_price_from || 0;
								var price_to = this.filter_price_to || 9999999;
								this.filter = this.filter.toUpperCase();
								this.sortedHomesHandler = this.sortedHomesHandler.filter(row=>{
										return (row.title.toUpperCase().includes(this.filter)
												|| row.description.toUpperCase().includes(this.filter)
												|| row.source.toUpperCase().includes(this.filter)
										)
												&& (
														row.price >= price_from
														&& row.price <= price_to
												)
										;
								});
						}
						return this.sortedHomesHandler;
				}
		},
		methods: {
				sortAsc: function(sort){
						if (sort==this.sortBy){
								this.sortDir +=-1;
						}	
						this.sortBy = sort;
				},
				formatNumber: function(num){
						return num.toLocaleString('sl');
				}
		}
}
</script>
<style scoped>
.image {
		z-index:10;
		width:200px;
		height:200px;
		transition: transform .2s;

}
.image:hover {

		-ms-transform: scale(2); /* IE 9 */
		-webkit-transform: scale(2); /* Safari 3-8 */
		transform: scale(2); 
}
.zui-table {
		border: solid 1px #DDEEEE;
		border-collapse: collapse;
		border-spacing: 0;
		font: normal 13px Arial, sans-serif;
}
.zui-table thead th {
		background-color: #DDEFEF;
		border: solid 1px #DDEEEE;
		color: #336B6B;
		padding: 10px;
		text-align: left;
		text-shadow: 1px 1px 1px #fff;
}
.zui-table tbody td {
		border: solid 1px #DDEEEE;
		color: #333;
		padding: 10px;
		text-shadow: 1px 1px 1px #fff;
}
</style>

