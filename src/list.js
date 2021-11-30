import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './App.css';
import { List } from '@mui/material';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
  },
  {
    id: 'cato',
    name: 'Little Cato',
  },
  {
    id: 'kvn',
    name: 'KVN',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
  }
]

function List_demo() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              // <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              //   {characters.map(({id, name, thumb}, index) => {
              //     return (
              //       <Draggable key={id} draggableId={id} index={index}>
              //         {(provided) => (
              //           <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              //             {/* <div className="characters-thumb">
              //               <img src={thumb} alt={`${name} Thumb`} />
              //             </div> */}
              //             <p>
              //               { name }
              //             </p>
              //           </li>
              //         )}
              //       </Draggable>
              //     );
              //   })}
              //   {provided.placeholder}
              // </ul>
              <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}
                {...provided.droppableProps} ref={provided.innerRef}
              >
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        >
                          <Grid container wrap="nowrap" spacing={4}
                          >
                            <Grid item>
                              <Avatar>W</Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                              <Typography noWrap>{name}</Typography>
                            </Grid>
                            <Grid item onClick = {()=>{console.log("a")}}>
                              <BorderColorIcon/>
                            </Grid>
                          </Grid>
                        </Paper>)}
                        
                    </Draggable>)
                })}
                {provided.placeholder}
            </Box>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p>
    </div>
  );
}

export default List_demo;