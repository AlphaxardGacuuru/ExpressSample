class Resource {
	constructor(value) {
		// Check the type of the value and delegate to appropriate method
		if (typeof value === "object" && !Array.isArray(value)) {
			if (value.hasOwnProperty("docs")) {
				return this.paginated(value)
			} else {
				return this.document(value)
			}
		} else if (Array.isArray(value)) {
			return this.collection(value)
		} else {
			throw new Error(`Property must be of type object or array. Provided type: ${typeof value}`)
		}
	}

	/**
	 * Handle a single document (object)
	 * @param {object} doc - The document to process
	 */
	document(doc) {
		console.log("Processing document:", doc)

		return this.resource(doc)
	}

	/**
	 * Handle a collection (array)
	 * @param {array} arr - The collection to process
	 */
	collection(arr) {
		console.log("Processing collection:", arr)

		return arr.map((item) => this.resource(item))
	}

	/**
	 * Handle a paginated collection (array)
	 * @param {array} arr - The collection to process
	 */
	paginated(arr) {
		console.log("Processing paginated collection:", arr)

		arr.docs = arr.docs.map((item) => this.resource(item))

		return arr
	}
}

export default Resource
