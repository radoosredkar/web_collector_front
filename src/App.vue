<template>
	<div id="app">

		<!--
	  <h1>Employees</h1>
	  <employee-form @add:employee="addEmployee" />
	  <employee-table v-bind:employees="employees" />
		-->
		<h1><spinner ref="spinner"></spinner>Homes</h1>
		<homes-table  v-bind:homes="visible" v-on:refresh="refreshData()" v-on:reload="reloadData()" @update="updateData" @saveComment="saveComment" v-bind:all_refreshed="all_refreshed" />
	</div>
</template>

<script>
import Vue from 'vue'
import Spinner from '@/components/Spinner.vue'
import EmployeeTable from '@/components/EmpoyeeTable.vue'
import HomesTable from '@/components/HomesTable.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import gql from 'graphql-tag'
var ajax = require("vuejs-ajax")
Vue.use(ajax);

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
								comments
								dateCreated
								dateFound
								image
								advUrl
								type
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
			this.$apollo.queries.archived.refetch();
			this.$refs.spinner.hide();
		},	
		saveComment(id, comment){
			console.log(id,comment);
			parent = this;
			Vue.ajax({
				url: process.env.URL_UPDATE + '/' + id,
				method: "patch",
				headers: {
					'Access-Control-Allow-Origin': '*'
					/*,'Content-Type': 'application/json'*/
				},
				data: { "comments": comment},
				timeout: 600000,
			}).then(
				function(response) {
					return response.data;
				}, 
				function(response) {
					console.log('END ERROR');
					console.log("Error", response.statusText)
				});
		},
		updateData(id, selected_type){
			parent = this;
			Vue.ajax({
				url: process.env.URL_UPDATE + '/' + id,
				method: "patch",
				headers: {
					'Access-Control-Allow-Origin': '*'
					/*,'Content-Type': 'application/json'*/
				},
				data: { "type": selected_type},
				timeout: 600000,
			}).then(
				function(response) {
					return response.data;
				}, 
				function(response) {
					console.log('END ERROR');
					console.log("Error", response.statusText)
				});
		},	
		reloadData(){
			
			this.$refs.spinner.show();
			this.loadData(this);
		},	
		loadData(context) {
			console.log('START OK', process.env.URL_REFRESH);
			this.all_refreshed = NaN;
			parent = this;
			Vue.ajax({
				url: process.env.URL_REFRESH,
				//url: 'https://jsonplaceholder.typicode.com/todos',
				method: "get",
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				timeout: 600000,
			}).then(
				function(response) {
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
