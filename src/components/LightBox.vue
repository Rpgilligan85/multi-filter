<template>
<div @click.self="closeLightBox()" class="overlay">
	<v-container v-if="!fullscreen" fluid>
		<v-row no-gutters @click.self="closeLightBox()" justify="center" align="center">
			<v-col cols="2">
				<v-card class="thumbnails" height="90vh" tile color="rgba(0,0,0,0.8)">
					<v-img 
						v-for="(image, key) in images"
						:key="key"
						class="myImage"
						contain 
						:src="image"
						@click="currentImage = images[key]; index = key"
					/>

				</v-card>
			</v-col>
			<v-col cols="8">
				<v-btn @click="closeLightBox()" small class="closeBtn" fab dark>
						<v-icon size="28px"  color="white">mdi-close</v-icon>
					</v-btn>
				<v-card class="largeImg" tile height="90vh" color="rgba(0,0,0,0.8)">
					<v-btn @click="prevImage()" class="prevIcon" fab dark>
						<v-icon size="36px"  color="white">mdi-arrow-left</v-icon>
					</v-btn>
					<v-btn @click="nextImage()" class="nextIcon" fab dark>
						<v-icon size="36px" color="white">mdi-arrow-right</v-icon>
					</v-btn>
					<v-img 
						style="cursor:pointer"
						max-width="100%" 
						max-height="100%"
						contain 
						:src="images[index]"
						@click="fullscreen = true"
					/>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	<v-container v-if="fullscreen">
		<v-row no-gutters @click.self="closeLightBox()" justify="center" align="center">
			<v-card class="largeImg" tile height="100vh" color="rgba(0,0,0,0)">
			<v-img 
				style="cursor:pointer"
				max-width="100%" 
				max-height="100%"
				contain 
				:src="images[index]"
				@click="fullscreen = false"
			/>
			</v-card>
		</v-row>
	</v-container>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: ['images'],
	data: () => ({
		index:0,
		fullscreen: false
	}),
	computed: {
		...mapActions(['updateLightBox']),
	},
	methods:{
		closeLightBox() {
			this.$store.dispatch('updateLightBox',false)
		},
		prevImage() {
			if(this.index === 0) {
				this.index = this.images.length - 1
			} else {
				this.index--
			}
		},
		nextImage() {
			if(this.index >= this.images.length -1) {
				this.index = 0
			} else {
				this.index++
			}
		},
	},

};
</script>
<style lang="scss">
	.overlay {
		display: flex;
		height: 100vh;
		width: 100vw;
		background: rgba(0,0,0,0.8);
		position: absolute;
		top:0;
		left:0;
		align-items: center;
	}

	.largeImg {
		display:flex !important;
		align-items:center;
		padding-right: 10px;
	}

	.nextIcon {
		position: absolute !important;
		right: 20px;
		z-index: 900000;
	}
	.prevIcon {
		position: absolute !important;
		left: 10px;
		z-index: 900000;
	}
	.closeBtn {
		position: absolute !important;
		right: 10px;
		top: 10px;
		z-index: 900000;
	}

	.thumbnails {
		overflow-y: scroll;
		padding: 10px 0;


		&::-webkit-scrollbar {
			width: 0;
			background: transparent;
		}

		.myImage {
			height: auto;
			width: 90%;
			margin: 0 auto;
			cursor: pointer;
			padding: 5px 0;

			&:hover {
				opacity: 0.7;
			}
		}
	}

	.close-btn {
		position: absolute !important;
		right: 0px;
		top: -40px;
		z-index: 100;
		color: #666 !important;
		cursor: pointer;
	}

	.close-btn:hover {
		color: #fff !important;
	}
</style>