/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

class Request {
	async get(url: string, headers?: any) {
		return await axios.get(url, {
			headers: headers
		})
	}
	async post(url: string, data: object, headers?: any) {
		if (headers) {
			return await axios.post(url, data, { headers: headers })
		}
		return await axios.post(url, data)
	}
}

export default new Request()