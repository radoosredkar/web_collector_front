<template>
		<div id="homes-table">
				<input placeholder="filter by description, title, source" v-model="filter">
				<select v-model="filter_type">
					<option value="">all</option>
					<option value="NEW_RECORD">new record</option>
					<option value="CANDIDATE">candidate</option>
					<option value="FAVORITES">favorites</option>
					<option value="NOT_CANDIDATE">not candidate</option>
					<option value="ARCHIVED">archived</option>
				</select>
				<input placeholder="price from" v-model="filter_price_from">
				<input placeholder="price from" v-model="filter_price_to">
				<input type="button" value="refresh" v-on:click="$emit('refresh')">
				<input type="button" value="reload" v-on:click="$emit('reload')">
				<h3>Visible {{visibleHomes}}  All refreshed {{all_refreshed}}</h3>
				<table class="zui-table">
						<thead>
								<tr>
										<th v-on:click="sortAsc('id')">#</th>
										<th v-on:click="sortAsc('title')">Title</th>
										<th>Description</th>
										<th v-on:click="sortAsc('price')">Price</th>
										<th>image</th>
										<th>Source</th>
										<th>Comments</th>
										<th v-on:click="sortAsc('dateCreated')">Date Created</th>
										<th v-on:click="sortAsc('dateFound')">Last Found Date</th>
										<th>Type</th>
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
										<td>
										<textarea style="height:20vh" v-model="home.comments" type="text"/><button v-on:click="$emit('saveComment', home.id, home.comments)">Apply</button>
										</td>
										<td>{{home.dateCreated}}</td>
										<td>{{home.dateFound}}</td>
										<td>
												<select v-model="home.type" v-on:change="$emit('update', home.id, home.type)">
													<option value="">all</option>
													<option value="NEW_RECORD">new record</option>
													<option value="CANDIDATE">candidate</option>
													<option value="FAVORITES">favorites</option>
													<option value="NOT_CANDIDATE">not candidate</option>
													<option value="ARCHIVED">archived</option>
												</select>
										</td>
								</tr>
						</tbody>
				</table>
		</div>
</template>

<script>
export default {
		name: 'homes-table',
		props: {
				homes:Array,
				all_refreshed:Number,
				selected:String
		},
		data() {
				return {
						filter:'',
						filter_type:'',
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
						if (this.sortedHomesHandler && (
								this.filter || this.filter_price_from || this.filter_price_to || this.filter_type
						)){
								var price_from = this.filter_price_from || 0;
								var price_to = this.filter_price_to || 9999999;
								this.filter = this.filter.toUpperCase();
								this.filter_type = this.filter_type.toUpperCase();
								this.sortedHomesHandler = this.sortedHomesHandler.filter(row=>{
										return (row.title.toUpperCase().includes(this.filter)
												|| row.description.toUpperCase().includes(this.filter)
												|| row.source.toUpperCase().includes(this.filter)
												|| row.comments.toUpperCase().includes(this.filter)
										)
												&& (
														row.price >= price_from
														&& row.price <= price_to
												) && (
													this.filter_type == "" ? true : (row.type.toUpperCase() == this.filter_type)
												)
										;
								});
						}
						return this.sortedHomesHandler;
				},
				visibleHomes: function() {
					return this.sortedHomes.length
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

