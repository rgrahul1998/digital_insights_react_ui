import axios from "axios"
import API_URL from "../config"

export const DataSourceListApi = async () => {
    try {
        const response = await axios.post(`${API_URL}/api/method/frappe.client.get_list`, {
            debug: 0,
            doctype: "Insights Data Source",
            fields: [
                "name",
                "title",
                "status",
                "creation",
                "modified",
                "is_site_db",
                "database_type",
                "allow_imports",
            ],
            filters: {"database_type": "SQLite"},
            limit: 100,
            limit_page_length: 100,
            limit_start: 0,
            order_by: "creation desc",
            start: 0,
        })

        if (response.status === 200) {
            return response.data.message // Return data on success
        } else {
            console.error("Failed to fetch data:", response.statusText)
            throw new Error("Failed to fetch data")
        }
    } catch (error) {
        console.error("Error:", error)
        throw new Error("An error occurred while fetching data")
    }
}
