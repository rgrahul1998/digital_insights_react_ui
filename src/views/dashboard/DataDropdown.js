// DataDropdown.js
import React from "react"
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react"

const DataDropdown = ({ dataSources, selectedDataSource, handleDataSourceSelect }) => (
    <CDropdown className="w-100">
        <CDropdownToggle color="white" className="w-100">
            {selectedDataSource}
        </CDropdownToggle>
        <CDropdownMenu style={{ maxHeight: "300px", overflowY: "auto" }}>
            {dataSources.map((source) => (
                <CDropdownItem
                    key={source.name}
                    onClick={() => handleDataSourceSelect(source.name, source.database_type)}
                >
                    {source.title}
                </CDropdownItem>
            ))}
        </CDropdownMenu>
    </CDropdown>
)

export default DataDropdown
