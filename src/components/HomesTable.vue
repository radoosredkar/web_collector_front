<template>
  <div id="homes-table">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
		<tr v-for="home in orderedHomes " :key="home.id">
			<td>{{home.id}}</td>
			<td>{{home.title}}</td>
			<td>{{home.description}}</td>
			<td>{{home.price}}</td>
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
	computed: {
		orderedHomes: function(){
			return this.homes.sort((a,b)=>(a.price>b.price)? 1 : -1)
		}
	}
}
</script>

<style scoped></style>

