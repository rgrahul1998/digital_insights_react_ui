import API_URL from "../config"


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
