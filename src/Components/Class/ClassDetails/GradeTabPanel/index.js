import { Container } from "@mui/material";
import TabPanel from "../TabPanel";
import AssignmentStruct from "./AssignmentStruct";

export default function GradeTabPanel({ value, index }) {
    //console.log("GradeTabPanel")
    //console.log(value)
    return (
        <>
            <TabPanel value={value} index={index}>
                <Container maxWidth="md">
                    <AssignmentStruct/>
                </Container>
            </TabPanel>
        </>
    );
}