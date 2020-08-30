<template>
		<div id="app">

<!--
				<h1>Employees</h1>
				<employee-form @add:employee="addEmployee" />
						<employee-table v-bind:employees="employees" />
-->
				<h1>Homes</h1>
				<homes-table v-bind:homes="homes" />
		</div>
</template>

<script>
import EmployeeTable from '@/components/EmpoyeeTable.vue'
import HomesTable from '@/components/HomesTable.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import gql from 'graphql-tag'

export default {
		apollo: {
				// Simple query that will update the 'hello' vue property
				homes: gql`
				query{
				  homes {
					id
					title
				    description
				    price
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
