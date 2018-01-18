export default {
	users: {
		activeTab: 'home',
		error: null,
		currentUser: null,
		currentUserRole: null,
		token: null,
		showLoginPopup: false,
		showRegisterPopup: false,
		userList: []
	},

	reservations: {
		error: null,
		reservationList: [],
		activeUsersReservationList: [],
		toApprove: [],
		approved: [],
		declined: []
	},

	items:{
		error: null,
		itemList: [],
		deviceTypes: [],
		kits: [],
		subtypes: [],
		types: [],
		showItemCreatedPopup: false,
		status: true
	}
}