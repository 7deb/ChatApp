import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className="w-10 rounded-full ">
                <img alt='ALT img' src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Frandom-objects&psig=AOvVaw2t84V3j7cily7eBxCtkGuT&ust=1720460821787000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBxJO-lYcDFQAAAAAdAAAAABAE"} />
            </div>
        </div>
        <div className='chat-bubble text-white bg-blue-500'>hi what is upp</div>
        <div className='chat-footer opacity-50 text-xs gap-1 item-center'>12:42</div>
      
    </div>
  )
}

export default Message

