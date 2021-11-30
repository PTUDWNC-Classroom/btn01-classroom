import axios from "axios"
import { finalSpaceCharacters } from '../App';

export default async function getGradeAssignment() {
    // Kết nối database với đường dẫn /assignment/getGradeAssignment
    try {
        //alert("vao axios")
        // const response = await axios.post(`${process.env.REACT_APP_HOST}assignment/getGradeAssignment`,
        // {
        //     user: "vd"
        // }
        // );
        const response = await axios.post("http://localhost:3000/assignment/getGradeAssignment",
        {
            classId: "vd"
        }
        );
        if (response) {
            // Sắp xếp theo indexAssignment
            const result = SortByIndexAssignment(response.data);
            // Trả dữ liệu đã sắp xếp
            return result;
        }
    } catch (error) {
        console.error(error);
    }

    //return finalSpaceCharacters;
}

// Sắp xếp theo indexAssignment
function SortByIndexAssignment(data) {
    let result = data;
    let tmp = null;
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = i+1; j < result.length; j++) {
            if (result[i].indexAssignment > result[j].indexAssignment)
            {
                tmp = result[i];
                result[i] = result[j];
                result[j] = tmp;
            }
        }
    }
    console.log(result);
    return result;
}
