import React, { memo } from 'react';

const ToDo = ({ ToDos }) => {
  console.log("ToDo rendered");
  return (
    <>
      <h3>ToDo</h3>
      {ToDos && ToDos.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}

const memoizeToDo = memo(ToDo);
export default memoizeToDo;