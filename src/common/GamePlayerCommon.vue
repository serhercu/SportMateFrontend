<script>
	import srvCity from '@/services/srv-city'
	import srvSport from '@/services/srv-sport'

	export default {
		methods: {
			async fGetAllCities() {
				const result = await srvCity.getAllCities()
        return result
			},
			async fGetAllSports () {
				var result = await srvSport.getAllSports()
				result = result.sort((a, b) => a.name.localeCompare(b.name))
        return result;
    	},
			fGetSportName(item) {
				return this.$t('sport.' + item.name)
			}
		}
	}
</script>