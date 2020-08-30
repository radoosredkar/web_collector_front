<template>
  <div id="homes-table">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
		<tr v-for="home in homes" :key="home.id">
			<td>{{home.id}}</td>
			<td>{{home.title}}</td>
			<td>{{home.description}}</td>
			<td>{{home.price}}</td>
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
	}
}
</script>

<style scoped></style>

