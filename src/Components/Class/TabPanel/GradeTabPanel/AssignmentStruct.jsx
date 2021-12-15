//import '../App.css';
import React, { useEffect, useState, useContext } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import Box from "@mui/material/Box"

import { Paper, Typography } from "@mui/material"
import {
  AddGradeAssignmentCard,
  GradeAssignmentCard,
} from "./GradeAssignmentCard"
import classroomAxios from "../../../DataConnection/axiosConfig"
import { useLocation } from "react-router"
import { tabsContext } from "../../../../context/TabsContext"

export default function AssignmentStruct() {
  //const [characters, updateCharacters] = useState(finalSpaceCharacters);
  // const [characters, updateCharacters] = useState([])
  const [open, setOpen] = useState(false)
  const location = useLocation()
  // Lấy classId từ địa chỉ
  const classId = location.pathname.split("/")[2]
  const { gradeStruct, updateGradeStruct } = useContext(tabsContext)
  useEffect(() => {
    // Nhận dữ liệu từ GetGradeAssignment.js
    const GradeAssignmentData = async () => {
      try {
        //alert("vao axios")
        // const response = await axios.post(`${process.env.REACT_APP_HOST}assignment/getGradeAssignment`,
        // {
        //     user: "vd"
        // }
        // );
        const response = await classroomAxios.post(
          `assignment/getGradeAssignment`,
          {
            classId: classId,
          }
        )
        if (response) {
          // Trả dữ liệu đã sắp xếp
          setOpen(false)
          updateGradeStruct(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    GradeAssignmentData()

    //console.log("update")

    // eslint-disable-next-line
  }, [open, classId])

  const handleUpdate = async (sourceId, sourceIndex, desId, desIndex) => {
    // Update gradeTitleState và gradeDetailState
    // theo đường dẫn /assignment/updateIndexAssignment
    const UpdateAssignment = async () => {
      try {
        const response = await classroomAxios.post(
          `assignment/updateIndexAssignment`,
          {
            classId: classId,
            sourceId: sourceId,
            sourceIndex: sourceIndex,
            desId: desId,
            desIndex: desIndex,
          }
        )
        if (response) {
          setOpen(true)
          //setOpen(false);
          return true
        }
      } catch (error) {
        console.error(error)
      }
    }

    //console.log(await UpdateAssignment());
    UpdateAssignment()
  }

  //const [disableState, setDisableState] = useState(true)
  function handleOnDragEnd(result) {
    //console.log("handleOnDragEnd")
    //console.log(characters[result.source.index]);
    if (!result.destination) return

    const items = Array.from(gradeStruct)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateGradeStruct(items)

    handleUpdate(
      gradeStruct[result.source.index]._id,
      gradeStruct[result.source.index].indexAssignment,
      gradeStruct[result.destination.index]._id,
      gradeStruct[result.destination.index].indexAssignment
    )
  }

  function handleDisable(_id) {
    let x = gradeStruct.map((item) => {
      if (item._id === _id) {
        item.disableState = !item.disableState
      }
      return item
    })
    //console.log(x)

    updateGradeStruct(x)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Grade Assignment</h1>
          <h3>Overview</h3>

          {gradeStruct.length !== 0
            ? gradeStruct.map(({ gradeTitle, gradeDetail }, index) => {
                return (
                  <Typography
                    key={index}
                    variant="h6"
                    align="left"
                    style={{ marginLeft: 50 }}
                  >
                    - {gradeTitle}: {gradeDetail}
                  </Typography>
                )
              })
            : null}
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Box
                sx={{ flexGrow: 1, overflow: "hidden", px: 4 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {gradeStruct.length !== 0
                  ? gradeStruct.map(
                      (
                        { _id, gradeTitle, gradeDetail, disableState },
                        index
                      ) => {
                        return (
                          <Draggable key={_id} draggableId={_id} index={index}>
                            {(provided) => (
                              <Paper
                                sx={{ maxWidth: 400, my: 1, mx: "auto", p: 2 }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <GradeAssignmentCard
                                  _id={_id}
                                  gradeTitle={gradeTitle}
                                  gradeDetail={gradeDetail}
                                  disableState={disableState}
                                  index={index}
                                  handleDisable={handleDisable}
                                  setOpen={setOpen}
                                />
                              </Paper>
                            )}
                          </Draggable>
                        )
                      }
                    )
                  : null}
                {provided.placeholder}
                <AddGradeAssignmentCard setOpen={setOpen} classId={classId} />
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  )
}
