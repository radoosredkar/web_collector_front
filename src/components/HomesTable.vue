<template>
	<div id="homes-table">
		<input placeholder="filter by description, title, source" v-model="filter">
		<select id="ddl_filter" v-model="filter_type">
			<option v-if="showAll" value="">all</option>
			<option value="NEW_RECORD">new record</option>
			<option value="CANDIDATE">candidate</option>
			<option value="FAVORITES">favorites</option>
			<option v-if="showAll" value="NOT_CANDIDATE">not candidate</option>
			<option v-if="showAll" value="ARCHIVED">archived</option>
		</select>
		<input placeholder="price from" v-model="filter_price_from">
		<input placeholder="price from" v-model="filter_price_to">
		<input type="button" value="refresh" v-on:click="$emit('refresh')">
		<input type="button" value="reload" v-on:click="$emit('reload')">
		<h3>Visible {{visibleHomes}}  All refreshed {{all_refreshed}}</h3>
		<table class="zui-table">
			<thead>
				<tr>
					<th v-on:click="sortAsc('title')">Title</th>
					<th>image</th>
					<th>Description</th>
					<th>Comments</th>
					<th v-on:click="sortAsc('price')">Price</th>
					<th class="desktop_only">Source</th>
					<th class="desktop_only" v-on:click="sortAsc('id')">#</th>
					<th class="desktop_only" v-on:click="sortAsc('dateCreated')">Date Created</th>
					<th class="desktop_only" v-on:click="sortAsc('dateFound')">Last Found Date</th>
					<th>Type</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="home in sortedHomes ">
					<td class="mobile_title">{{home.title}}</td>
					<td>
						<a target="__blank__" :href="home.advUrl">
							<img :src="home.image" class="image">
						</a>
					</td>
					<td>{{home.description}}</td>
					<td>
						<textarea rows="5" v-model="home.comments" type="text" v-on:blur="$emit('saveComment', home.id, home.comments)"/>
					</td>
					<td>{{formatNumber(home.price)}}</td>
					<td class="desktop_only">{{home.source}}</td>
					<td class="desktop_only">{{home.id}}</td>
					<td class="desktop_only">{{home.dateCreated}}</td>
					<td class="desktop_only">{{home.dateFound}}</td>
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
			filter_type:'CANDIDATE',
			filter_price_from:null,
			filter_price_to:null,
			sortBy:'',
			sortDir:1,
			sortedHomesHandler:Array
		}
	},
    created: function () {
        var params = new Proxy(new URLSearchParams(window.location.search), {
              get: (searchParams, prop) => searchParams.get(prop),
        });
        this.showAll = false;
        if (params.env == 'dev') {
            this.showAll = true;
        }
    },
	computed: {	
		sortedHomes: function() {
			if (this.sortBy){
				this.sortedHomesHandler = this.homes.sort((a,b)=>{
					if (this.sortBy == 'dateFound' || this.sortBy == 'dateCreated') {
						return Date.parse(a[this.sortBy])>Date.parse(b[this.sortBy]) * this.sortDir;
					} else {
                        var p1,p2, result = NaN;
                        try {
                            p1 = parseFloat(a[this.sortBy])
                            p2 = parseFloat(b[this.sortBy])
                            result = (p1 < p2) ? -1 : (p1 > p2) ? 1 : 0;
                            result = result * this.sortDir;
                        }
                        catch(err) {
                            result = 0;
                        }finally{
                            return result;
                        }
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
                this.query_filter_type = this.$route.query.filter_type
                //filter from query param has precedence
				this.filter_type =  this.query_filter_type || this.filter_type;
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
				this.sortDir *=-1;
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
body {
	font-family: "Open Sans", sans-serif;
	line-height: 1.25;
}
.image {
	z-index:10;
	width:100px;
	height:100px;
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
	table-layout: fixed;
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
	text-align: center;
}

table th {
	font-size: .85em;
	letter-spacing: .1em;
	text-transform: uppercase;
}

@media screen and (max-width: 600px) {
	table {
		border: 0;
	}

	table caption {
		font-size: 1.3em;
	}

	table thead {
		border: none;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}
	.mobile_title {
		background-color: #DDEFEF;
		border: solid 1px #DDEEEE;
		font-size: 1em;
		font-weight: bold;
		color: #336B6B;
		padding: 10px;
		text-align: center;
		text-shadow: 1px 1px 1px #fff;
	}

	.desktop_only {
		display:none;
	}

	table tr {
		border-bottom: 3px solid #ddd;
		display: block;
		margin-bottom: .625em;
	}

	table td {
		border-bottom: 1px solid #ddd;
		display: block;
		font-size: .8em;
		text-align: right;
	}

	table td::before {
		/*
		 * aria-label has no advantage, it won't be read inside a table
		 content: attr(aria-label);
		 */
content: attr(data-label);
float: left;
font-weight: bold;
text-transform: uppercase;
  }

  table td:last-child {
	  border-bottom: 0;
  }

  select, input {
	  width: 100%;
  }
  textarea {
	  width:100%;
	  padding:0px;
  }
}
</style>

