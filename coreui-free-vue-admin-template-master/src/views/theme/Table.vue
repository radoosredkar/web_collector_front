<template>
		<CCard>
		<CCardHeader>
		<slot name="header">
		<CIcon name="cil-grid"/> {{caption}}
		</slot>
		</CCardHeader>
		<CCardBody>
		<CDataTable
		  :hover="hover"
		  :striped="striped"
		  :border="border"
		  :small="small"
		  :fixed="fixed"
		  :items="items"
		  :fields="fields"
		  :items-per-page="small ? 10 : 5"
		  :dark="dark"
		  pagination
		  >
		  <template #status="{item}">
				  <td>
						  <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
				  </td>
		  </template>
		  <template #image="{item}">
				  <td>
						  <CImg :src="item.image" fluid className="mb-4" />
				  </td>
		  </template>
		  <template #show_details="{item}">
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  :onClick="test(item)"
				>
				Show		
                </CButton>
              </td>
		  </template>
		</CDataTable>
		</CCardBody>
		</CCard>
</template>

<script>
export default {
		name: 'Table',
		props: {
				items: Array,
				fields: {
						type: Array,
						default () {
								return [
										{ key: 'title' },	
										{key: 'description'},	
										{key: 'price'},	
										{key: 'image'},	
										{key: 'source'},	
										{key: 'comments'},	
										{key: 'date_created'},	
										{key: 'last_found_date'},
										{
												key: 'show_details',
												label: '',
												_style: { width: '1%' },
												sorter: false,
												filter: false
										}
								]
						}
				},
				caption: {
						type: String,
						default: 'Table'
				},
				hover: Boolean,
				striped: Boolean,
				border: Boolean,
				small: Boolean,
				fixed: Boolean,
				dark: Boolean
		},
		methods: {
				getBadge (status) {
						return status === 'Active' ? 'success'
								: status === 'Inactive' ? 'secondary'
								: status === 'Pending' ? 'warning'
								: status === 'Banned' ? 'danger' : 'primary'
				},
				test(item){
					console.log(item);
				}
		}
}
</script>
