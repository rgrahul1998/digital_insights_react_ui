import API_URL from "../config"
import axios from "axios"

// Function to fetch all queries with filters and pagination
export const fetchAllQueries = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/api/method/insights.api.queries.get_queries`,
            {
                debug: 0,
                doctype: "Insights Query",
                fields: [
                    "name",
                    "title",
                    "status",
                    "is_assisted_query",
                    "is_native_query",
                    "is_script_query",
                    "is_stored",
                    "data_source",
                    "creation",
                    "owner",
                    "owner_name",
                    "owner_image",
                    "chart_type",
                ],
                filters: {}, // Add any filtering logic here if required
                limit: 50,
                limit_page_length: 50,
                limit_start: 0,
                order_by: "creation desc",
                start: 0,
            },
        )

        return response.data.message // Assuming the data is in response.data.message
    } catch (error) {
        console.error("Failed to fetch queries:", error)
        throw new Error("Failed to fetch queries")
    }
}

export const fetchQueryData = async (queryName) => {
    const response = await fetch(`${API_URL}/api/method/frappe.client.get`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            doctype: "Insights Query",
            name: queryName,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch query data")
    }
    const result = await response.json()
    return result.message
}

export const getQueryData = async (queryName) => {
    const response = await fetch(
        `${API_URL}/api/method/digital_insights.digital_insights.api.get_query_data.get_query_data`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query_name: queryName,
            }),
        },
    )

    if (!response.ok) {
        throw new Error("Failed to fetch query data")
    }
    const result = await response.json()
    return result.message
}

export const setDataSource = async (queryName, dataSourceName) => {
    const response = await fetch(`${API_URL}/api/method/frappe.client.set_value`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            doctype: "Insights Query",
            fieldname: { data_source: dataSourceName },
            data_source: dataSourceName,
            name: queryName,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to set data source")
    }
    return response.json()
}

export const fetchTables = async (dataSource) => {
    const response = await fetch(`${API_URL}/api/method/run_doc_method`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dt: "Insights Data Source",
            dn: dataSource,
            method: "get_tables",
            args: null,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch tables")
    }
    const result = await response.json()
    return result.message
}
