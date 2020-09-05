<template>
		<div id="homes-table">
				<table class="zui-table">
						<thead>
								<tr>
										<th>#</th>
										<th>Title</th>
										<th>Description</th>
										<th>Price</th>
										<th>Image</th>
										<th>Source</th>
										<th>Date Created</th>
								</tr>
						</thead>
						<tbody>
								<tr v-for="home in homes " :key="home.id">
										<td>{{home.id}}</td>
										<td>{{home.title}}</td>
										<td>{{home.description}}</td>
										<td>{{home.price}}</td>
										<td>
												<a target="__blank__" :href="home.advUrl">
														<img :src="home.image" class="image">
												</a>
										</td>
										<td>{{home.source}}</td>
										<td>{{home.dateCreated}}</td>
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
		methods: {
				sortAsc: function(){
						return this.homes.sort(function(a,b){return a.id-b.id;});
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

