import React from 'react'
import { useSelector } from 'react-redux';

const MessageCard = ({ item }) => {

  const user = useSelector(store => store.auth.user);

  const isReqUserMessage = user?.id === item.user?.id;

  return (
    <div className={`flex ${!isReqUserMessage ? "justify-start" : "justify-end"} text-white`}>
      <div className={`p-1 ${false ? 'rounded-md' : 'px-5 rounded-full'} bg-[#191c29]`}>
        <p className={`${true ? 'py-2' : 'py-1'}`}>{item.content}</p>

      </div>
    </div>
  )
}

export default MessageCard