			<template>
		<div id="app">
				<h1>Homes({{noOfAllHomes}})</h1>
				<h3>Archived({{noOfAllHomesArchived}})</h3>
				<h3>All refreshed {{all_refreshed}} ({{last_refresh_date}})</h3>
				<homes-table v-bind:homes="visible" v-on:refresh="refreshData()"/>
		</div>
</template>

<script>
import Vue from 'vue'
import EmployeeTable from '@/components/EmpoyeeTable.vue'
import HomesTable from '@/components/HomesTable.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import gql from 'graphql-tag'
var ajax = require("vuejs-ajax")
Vue.use(ajax);
window.dataApollo = NaN;
export default {
		//mounted (){},
		apollo: {
			archived: {
				query: gql`
						query{
						  archived: home(archived:1) {
							id
						  }
						  visible: home(archived:0) {
							id
							title
							description
							source
							price
							dateCreated
							dateFound
							image
							advUrl
						  }
						}
				`,
				result(data){
					//window.dataApollo = data;
					this.visible = data.data.visible,
					this.archived = data.data.archived
				}

			}
		},
		name: 'App',
		components: {
				HomesTable,
		},
		data() {
				return {
					all_refreshed: 0,
					last_refresh_date: 'Not Yet Refreshed',
					visible:[]
				}
		},
		computed: {
				noOfAllHomes: function(){
						return this. visible && this. visible.length;
				},
				noOfAllHomesArchived: function(){
						return this.archived && this.archived.length;
				}
		},
		methods:{
				addEmployee(employee) {
						const lastId =
								this.employees.length > 0
								? this.employees[this.employees.length - 1].id
								: 0;
						const id = lastId + 1;
						const newEmployee = { ...employee, id };

						this.employees = [...this.employees, newEmployee];
				},
				refreshData(){
						this.loadData();
				},	
				async loadData(context) {
						//Load data to the database table
						var self = this;
						self.all_refreshed = 0;
						self.last_refresh_date = "refreshing";
						Vue.ajax({
								url: "http://localhost:5000/refresh",
								method: "get" // post, put, patch, delete, head, jsonp
						}).then(function(response) {
							self.all_refreshed = response.data;
							self.last_refresh_date = new Date().toLocaleString();
							self.$apollo.queries.archived.refetch();//TODO:Move this to refreshData!!!
							return response.data;
						}, function(response) {
								console.log("Error", response.statusText)
						})
				}
		},
}
</script>

<style>
#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
}
</style>
