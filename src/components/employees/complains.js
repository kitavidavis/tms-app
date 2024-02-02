import { Table } from "@mantine/core";
import { useContext, useState } from "react"
import { AuthContext } from "../../App"

export default function EmployeesComplains(){
    const { state, dispatch } = useContext(AuthContext);
    const [complains, setComplains] = useState([]);
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {complains.map((item, index) => {
                    return (
                        <tr key={`complains-${index}`} >

                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}