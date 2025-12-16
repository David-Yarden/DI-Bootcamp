import React from 'react'
import {useDispatch} from 'react-redux'
import { addlike } from './state/slice'

const Emojies = { like: '👍' };

export default function LikeButton({id, reactions}) {

  const renderEmojies = () => {
    return Object.entries(Emojies).map(([key, value], id) => {
      return <div key={id} onClick={()=>dispatch(addlike({pid: id, name: key}))} style={{cursor: 'pointer', display: 'inline-block', marginRight: '10px'}}>
        {value} {reactions[key]}
      </div>
    });
  }

  return (
    <div>
      <h3>Like Button</h3>
      {renderEmojies()}
    </div>
  )
}
