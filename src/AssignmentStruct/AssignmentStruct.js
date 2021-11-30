import '../App.css';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Box from '@mui/material/Box';

//import Grid from '@mui/material/Grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Grid from '@mui/material/Grid';
import { Button, Paper, Stack, TextField } from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import { finalSpaceCharacters } from '../App';
import { AddGradeAssignmentCard, GradeAssignmentCard } from './GradeAssignmentCard';
import axios from 'axios';
import { SortByIndexAssignment } from './GetGradeAssignment';


export default function AssignmentStruct() {
  //const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [characters, updateCharacters] = useState([]);
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
        const response = await axios.post("http://localhost:3000/assignment/getGradeAssignment",
          {
            classId: "vd"
          }
        );
        if (response) {
          // Sắp xếp theo indexAssignment
          //const result = SortByIndexAssignment(response.data);
          // Trả dữ liệu đã sắp xếp
          updateCharacters(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    GradeAssignmentData();
   
    console.log("update")
  }, [characters.length])
  
  const handleUpdate = async (sourceId,sourceIndex,desId,desIndex)=>
    {
        // Update gradeTitleState và gradeDetailState
        // theo đường dẫn /assignment/updateIndexAssignment
        const UpdateAssignment = async () => {
            try {
           
              const response = await axios.post("http://localhost:3000/assignment/updateIndexAssignment",
                {
                  classId: "vd",
                  sourceId: sourceId,
                  sourceIndex: sourceIndex,
                  desId: desId,
                  desIndex: desIndex
                }
              );
              if (response) {
                return true;
              }
            } catch (error) {
              console.error(error);
            }
          }

          console.log(await UpdateAssignment());
    }

  //const [disableState, setDisableState] = useState(true)
  function handleOnDragEnd(result) {
    console.log("handleOnDragEnd")
    console.log(characters[result.source.index]);
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);


    updateCharacters(items);

    handleUpdate(
      characters[result.source.index]._id,
      characters[result.source.index].indexAssignment,
      characters[result.destination.index]._id,
      characters[result.destination.index].indexAssignment
      )
  }

  function handleDisable(_id) {
    let x = characters.map(item => {
      if (item._id === _id) {
        item.disableState = !item.disableState;
      }
      return item;
    });
    console.log(x)
    updateCharacters(x);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 4 }}
                {...provided.droppableProps} ref={provided.innerRef}
              >
                {characters.length !== 0 ? characters.map(({ _id, gradeTitle, gradeDetail, disableState }, index) => {
                  return (
                    <Draggable key={_id} draggableId={_id} index={index}>
                      {(provided) => (
                        <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        >
                          <GradeAssignmentCard
                          _id = {_id}
                          gradeTitle = {gradeTitle}
                          gradeDetail = {gradeDetail}
                          disableState = {disableState}
                          index = {index}
                          handleDisable = {handleDisable}
                          />
                        </Paper>)}

                    </Draggable>)
                }) : null}
                {provided.placeholder}
                <AddGradeAssignmentCard/>
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}