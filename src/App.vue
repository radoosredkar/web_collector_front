<template>
		<div id="app">

				<!--
			<h1>Employees</h1>
			<employee-form @add:employee="addEmployee" />
			<employee-table v-bind:employees="employees" />
				-->
				<h1>Homes({{noOfAllHomes}})</h1>
				<homes-table v-bind:homes="homes" v-on:refresh="refreshData()" v-bind:all_refreshed="all_refreshed" />
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

export default {
		apollo: {
				// Simple query that will update the 'hello' vue property
				homes: gql`
				query{
				  homes {
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
		},
		name: 'App',
		components: {
				EmployeeForm,
				EmployeeTable,
				HomesTable,
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
					all_refreshed: 0
				}
		},
		computed: {
				noOfAllHomes: function(){
						return this.homes && this.homes.length;
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
					this.loadData(this);
				},	
				loadData(context) {
								this.all_refreshed = NaN;
						Vue.ajax({
								url: "http://localhost:5000/refresh",
								method: "get" // post, put, patch, delete, head, jsonp
						}).then(function(response) {
								context.all_refreshed = response.data;
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
