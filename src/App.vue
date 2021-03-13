<template>
	<div id="app">

		<!--
	  <h1>Employees</h1>
	  <employee-form @add:employee="addEmployee" />
	  <employee-table v-bind:employees="employees" />
		-->
		<h1><spinner ref="spinner"></spinner>Homes({{noOfAllHomes}})</h1>
		<h1>Archived({{noOfAllHomesArchived}})</h1>
		<homes-table v-bind:homes="visible" v-on:refresh="refreshData()" v-bind:all_refreshed="all_refreshed" />
	</div>
</template>

<script>
import Vue from 'vue'
import EmployeeTable from '@/components/EmpoyeeTable.vue'
import HomesTable from '@/components/HomesTable.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import Spinner from '@/components/Spinner.vue'
import gql from 'graphql-tag'
var ajax = require("vuejs-ajax")
Vue.use(ajax);

console.log(process.env);
export default {
	apollo: {
		archived: {
			query: gql`
						query{
							archived: homes(archived:1) {
								id
							}
							visible: homes(archived:0) {
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
				this.visible = data.data.visible,
					this.archived = data.data.archived
			}

		}
	},
	name: 'App',
	components: {
		HomesTable,
		Spinner
	},
	data() {
		return {
			employees: [
				{
					id: 1,
					name: 'Richard Hendricks',
					email: 'richard@piedpiper.com',
				},
				{
					id: 2,
					name: 'Bertram Gilfoyle',
					email: 'gilfoyle@piedpiper.com',
				},
				{
					id: 3,
					name: 'Dinesh Chugtai',
					email: 'dinesh@piedpiper.com',
				},
				{
					id: 4,
					name: 'Rado Osredkar',
					email: 'rado.osredkar@gmail.com',
				},
			],
			all_refreshed: 0,
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
			this.$refs.spinner.show();
			this.loadData(this);
			//this.$apollo.queries.archived.refetch();
		},	
		loadData(context) {
			this.all_refreshed = NaN;
			parent = this;
			Vue.ajax({
				url: process.env.URL_REFRESH,
				//url: 'https://jsonplaceholder.typicode.com/todos',
				method: "get",
				timeout: 600000// post, put, patch, delete, head, jsonp
			}).then(
				function(response) {
					//console.log('END OK');
					context.all_refreshed = response.data['all_changed_items'];
					parent.$apollo.queries.archived.refetch();
					parent.$refs.spinner.hide();
					return response.data;
				}, 
				function(response) {
					console.log('END ERROR');
					console.log("Error", response.statusText)
				});
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
