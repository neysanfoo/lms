import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UploadWeek from './UploadWeek';
import { useParams } from 'react-router-dom';
import axios from 'axios'
const baseURL="http://127.0.0.1:8000/api"

function CreateCourse() {
  const [courseContent, setCourseContent] = useState([]);
  const [courseWeeks, setCourseWeeks] = useState([]);

  const {course_id} = useParams();
  const [courseData, setCourseData] = useState({});  

  console.log(course_id)

  useEffect(()=>{
    try{
      axios.get(baseURL + '/course/' + course_id).then(response=>{
        setCourseData(response.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }, []);
  console.log(courseData)

  function addWeek(){
    const newCourseWeek =  {
        week: courseWeeks.length + 1,
        };
        setCourseWeeks([...courseWeeks, newCourseWeek]);
    }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(courseContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCourseContent(items);
  }

  function getWeekNumber(str){
    return parseInt(str.substring(str.lastIndexOf("-") + 1));
  }

  
  function handleFileUpload(event) {
    const files = event.target.files;
    setCourseContent([...courseContent, { id: files[0].name, name: files[0].name, type: files[0].type, week: getWeekNumber(event.target.name) }]);
  }

  return (
    <div>
      <header>
        <h1 className='create--course--title'>Create Course <span className='text-primary'>{courseData.title}</span></h1>
        <div className='course--information'>
          <p>Description: {courseData.description}</p>
          <p>Instructor: {courseData.teacher ? courseData.teacher.full_name : ""}</p>
          <p>Keywords: {courseData.keywords}</p>
        </div>
          
          {courseWeeks.map((week, index) => {
            return (
              <UploadWeek 
                key={index} 
                weekNumber={week.week} 
                courseContent={courseContent} 
                handleFileUpload={handleFileUpload} 
                handleOnDragEnd={handleOnDragEnd} 
              />
            )
          })}
  
      </header>
      
      <button className="add--week--button" onClick={addWeek}>Add Week</button>
    </div>
  );
}

export default CreateCourse;