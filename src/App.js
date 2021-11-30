import './App.css';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Box from '@mui/material/Box';

//import Grid from '@mui/material/Grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Grid from '@mui/material/Grid';
import { Button, Paper, Stack, TextField } from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import getGradeAssignment, { SortByIndexAssignment } from './AssignmentStruct/GetGradeAssignment';
import axios from "axios"
import { AddGradeAssignmentCard, GradeAssignmentCard } from './AssignmentStruct/GradeAssignmentCard';

import AssignmentStruct from './AssignmentStruct/AssignmentStruct'
export const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    disableState: true
  },
  {
    id: 'cato',
    name: 'Little Cato',
    disableState: false
  },
  {
    id: 'kvn',
    name: 'KVN',
    disableState: true
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    disableState: true
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    disableState: true
  }
]

function App() {
  // const [characters, updateCharacters] = useState(finalSpaceCharacters);

  
  // //const [disableState, setDisableState] = useState(true)
  // function handleOnDragEnd(result) {
  //   console.log(result);
  //   if (!result.destination) return;

  //   const items = Array.from(characters);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateCharacters(items);
  // }

  // function handleDisable(id) {
  //   let x = characters.map(item => {
  //     if (item.id === id) {
  //       item.disableState = !item.disableState;
  //     }
  //     return item;
  //   });
  //   console.log(x)
  //   updateCharacters(x);
  // }

  // // return (
  // //   <div className="App">
  // //     <header className="App-header">
  // //       <h1>Final Space Characters</h1>
  // //       <DragDropContext onDragEnd={handleOnDragEnd}>
  // //         <Droppable droppableId="characters">
  // //           {(provided) => (
  // //             <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 4 }}
  // //               {...provided.droppableProps} ref={provided.innerRef}
  // //             >
  // //               {characters.length !== 0 ? characters.map(({ id, name, disableState }, index) => {
  // //                 return (
  // //                   <Draggable key={id} draggableId={id} index={index}>
  // //                     {(provided) => (
  // //                       <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}
  // //                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
  // //                       >
  // //                         <GradeAssignmentCard
  // //                         id = {id}
  // //                         name = {name}
  // //                         disableState = {disableState}
  // //                         index = {index}
  // //                         handleDisable = {handleDisable}
  // //                         />
  // //                       </Paper>)}

  // //                   </Draggable>)
  // //               }) : null}
  // //               {provided.placeholder}
  // //               <AddGradeAssignmentCard/>
  // //             </Box>
  // //           )}
  // //         </Droppable>
  // //       </DragDropContext>
  // //     </header>
  // //   </div>
  // // );
  return (
    <>
      <AssignmentStruct/>
    </>
  )
}

export default App;