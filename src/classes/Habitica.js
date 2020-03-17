export default class Habitica {
	constructor() {
		this.BASE_URL = 'https://habitica.com/api/v3/';
		this.API_USER = '{API_USER}'
		this.endpoints = {
			user: 'user',
			member: `members/${this.API_USER}`,
			party: 'groups/party',
		};
	}

	async request(endpoint, userData={}) {
		let link = `${this.BASE_URL}${this.endpoints[endpoint]}`;
		if (userData.API_USER) {
			link = link.replace(this.API_USER, userData.API_USER);
		}
		return await axios.get(link);
	}
}