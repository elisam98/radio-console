$(()=> {
	$('.button-collapse').sideNav({
		draggable: true
	})
})

const Station = {
	data: () => {
		return {
			station: [],
			categories: ['', 'California', 'International', 'Jewish', 'Miami', 'National', 'New York', 'Sports'],
			types: ['', 'PLS', 'SHOUT', 'VLC']
		}
	},
	created() {
		this.getStation()
	},
	template: `
		<div class="row">
			<div class="col s12">
				<div class="card">
					<div class="card-content">
						<span class="card-title">{{station._id}}</span>
						<div class="row">
							<div class="input-field col s12 m6">
								<input placeholder="Name" v-model="station.name" type="text" class="validate" required>
							</div>
							<div class="input-field col s12 m6">
								<select v-model="station.category" class="browser-default">
									<option v-for="category in categories" :value="category">{{category}}</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="input-field col s12 m6">
								<select v-model="station.type" class="browser-default">
									<option v-for="type in types" :value="type">{{type}}</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="input-field col s12">
								<input placeholder="URL" v-model="station.url" type="text" class="validate" required>
							</div>
						</div>
						<div class="row">
							<div class="input-field col s12">
								<input @click="save" type="submit" class="btn right" value="Submit">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	props: ['id'],
	methods: {
		getStation() {
			axios.get('http://safetelecom.net/radio/api/stations/' + this.id).then(response => {this.station = response.data})
		},
		save() {
			axios.put('http://safetelecom.net/radio/api/stations/' + this.station._id, this.station).then(response => {
				router.push({ path: '/stations' })
			})
		}
	}
}


const Stations = {
	data: () => {
		return {stations: []}
	},
	methods: {
		getStations() {
			axios.get('http://safetelecom.net/radio/api/stations').then(response => {this.stations = response.data})
		},
		testUrl(url, type) {
			if(type == 'VLC') {
				return url
			} else if (type == 'PLS') {
				axios.get(url) //.then(response => console.log(result.body))
			}
		}
	},
	created() {
		this.getStations()
	},
	template: `
		<div class="card-panel">
			<table class="bordered">
				<tbody>
					<tr v-for="station in sortedStations" :key="station._id">
						<td>
							<router-link class="collection-item" :to="{name: 'station', params: {id: station._id}}">
								{{station.name}}
							</router-link>
						</td>
						<td>{{station.category}}</td>
						<td>{{station.type}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
	computed: {
		sortedStations() {
			return this.stations.sort(function(a, b) {
				if (a.name < b.name)
					return -1
				if (a.name > b.name)
					return 1
				return 0
			})
		}
	},
	components: {
		'station': Station
	}
}


const Podcast = {
	data() {
		return {
			podcast: {
				name: null,
				url: null,
				base64: null
			},
			categories: ['', 'Business', 'Jewish', 'News', 'Sports', 'Talk Shows']
		}
	},
	created() {
		this.getPodcast()
	},
	template: `
		<div class="row">
			<div class="col s12">
				<div class="card">
					<div class="card-content">
						<img class="responsive-img" :src="podcast.base64">
						<span class="card-title">{{podcast.name}}</span>
						<div class="row">
							<div class="input-field col s12 m10">
								<input placeholder="URL" v-model="podcast.url" type="text" class="validate" required>
							</div>
							<div class="input-field col s12 m2">
								<button class="btn" @click="parse(podcast.url)">Fetch Info</button>
							</div>
						</div>
						<div class="row">
							<div class="input-field col s12 m6">
								<input placeholder="Name" v-model="podcast.name" type="text" class="validate" required>
							</div>
							<div class="input-field col s12 m6">
								<select v-model="podcast.category" class="browser-default">
									<option v-for="category in categories" :value="category">{{category}}</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="input-field col s12">
								<button @click="saveItem" class="btn">Submit</button>
								<button @click="goBack" class="btn grey">Cancel</button>
								<button @click="deleteItem" v-if="id != 'new'" class="btn red">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	props: ['id'],
	methods: {
		getPodcast() {
			if(this.id != 'new') {
				axios.get('http://safetelecom.net/radio/api/podcasts/' + this.id).then(response => {this.podcast = response.data})
			}
		},
		saveItem() {
			if(this.id === 'new') {
				axios.post('http://safetelecom.net/radio/api/podcasts/', this.podcast).then(response => {
					router.push({ path: '/podcasts' })
				})
			} else {
				axios.put('http://safetelecom.net/radio/api/podcasts/' + this.podcast._id, this.podcast).then(response => {
					router.push({ path: '/podcasts' })
				})
			}
		},
		deleteItem() {
			if (confirm('Are you sure you want to delete? This action cannot be reversed.')) {
				axios.delete('http://safetelecom.net/radio/api/podcasts/' + this.podcast._id, this.podcast).then(response => {
					router.push({ path: '/podcasts' })
				})
			} else {
			// Do nothing!
			}
		},
		goBack() {
			router.go(-1)
		},
		parse(url) {
			axios.get('http://safetelecom.net/radio/parsexml?url=' + url).then(response => {
				this.podcast.base64 = response.data.base64
				this.podcast.name = response.data.title
			})
		}
	}
}


const Podcasts = {
	data() {
		return {podcasts: []}
	},
	methods: {
		getPodcasts() {
			axios.get('http://safetelecom.net/radio/api/podcasts').then(response => {this.podcasts = response.data})
		},
		openModal() {
			alert('Opened Modal')
		}
	},
	template: `
		<div>
		<div class="card-panel">
			<table class="bordered">
				<tbody>
					<tr v-for="podcast in sortedPodcasts" :key="podcast._id">
						<td><img class="thumb" :src="podcast.base64"></td>
						<td>
							<router-link class="collection-item" :to="{name: 'podcast', params: {id: podcast._id}}">
								{{podcast.name}}
							</router-link>
						</td>
						<td>{{podcast.category}}</td>
						<td>{{podcast.type}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
			<router-link :to="{name: 'podcast', params: {id: 'new'}}" class="btn-floating btn-large red">
				<i class="material-icons">add</i>
			</router-link>
		</div>
		</div>
	`,
	computed: {
		sortedPodcasts() {
			return this.podcasts.sort((a, b) => {
				if (a.name < b.name)
					return -1
				if (a.name > b.name)
					return 1
				return 0
			})
		}
	},
	components: {
		'podcast': Podcast
	},
	created() {
		this.getPodcasts()
	}
}


const routes = [
	{ path: '/', redirect: '/stations' },
	{ path: '/stations', component: Stations },
	{ path: '/stations/:id', name: 'station', component: Station, props: true },
	{ path: '/podcasts', component: Podcasts },
	{ path: '/podcasts/:id', name: 'podcast', component: Podcast, props: true }
]


const router = new VueRouter({
	routes // short for routes: routes
})

const app = new Vue({
	router,
	methods: {}
}).$mount('#app')
