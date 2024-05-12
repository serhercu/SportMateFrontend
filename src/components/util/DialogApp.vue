<template>
	<v-dialog v-model="dShow" transition="dialog-bottom-transition" width="auto">
		<template v-slot:activator="{ on }">
      <slot :openDialog="fOpenDialog" :closeDialog="fCloseDialog" v-on="on"></slot>
    </template>
		<v-card>
			<v-toolbar>{{ pTitle }}</v-toolbar>

			<v-card-text class="pa-12">
				{{ pDescription }}
			</v-card-text>

			<v-card-actions class="justify-end">
				<v-btn plain @click="fCloseDialog">{{ $t("btn.cancel") }}</v-btn>
				<v-btn @click="fConfirm">{{ $t("btn.confirm") }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
  export default {
		props: {
			pTitle: {
				type: String,
				required: true
			},
			pDescription: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				dShow: false
			}
		},
		methods: {
			fOpenDialog() {
				this.dShow = true;
			},
			fCloseDialog() {
				this.dShow = false;
			},
			fConfirm() {
				this.fCloseDialog()
				this.$emit('confirm')
			}
  }
  }
</script>