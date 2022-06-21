import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function UploadWeek({weekNumber, courseContent, handleFileUpload, handleOnDragEnd}) {
  return (
    <div>
        <div className='upload--course--container mb-4'>
          <div className='upload--course--title'>
            <h3>Week {weekNumber}</h3>
            <span className='ms-auto mt-2'>
              <input type='file' onChange={handleFileUpload} style={{display: "none"}} name={`selectedFile-${weekNumber}`} id={`selectedFile-${weekNumber}`}  />
              <input type="button" value="Add File" onClick={()=> document.getElementById(`selectedFile-${weekNumber}`).click()} />
            </span>
          </div> 
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="courseContent">
              {(provided) => (
                <ul className="uploaded--course--list" {...provided.droppableProps} ref={provided.innerRef}>
                  {courseContent.map(({id, name, type, week}, index) => {
                    if (week === weekNumber) {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>
                              {type.substring(0,6).includes("video/") ? <i class="bi bi-play-circle me-2"></i> : <i class="bi bi-file-earmark-pdf"></i>}  { name }
                            </p>
                          </li>
                        )}
                      </Draggable>
                    );}
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
    </div>
  )
}

export default UploadWeek