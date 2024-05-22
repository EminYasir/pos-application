import React from 'react'

const StatisticCard = ({title,amount,img}) => {
  return (
    <div>
        <div className="card-item bg-gray-800 p-8 rounded-lg">
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-16 h-16 p-3">
                  <img src={img} alt="" />
                </div>
                <div className="text-white">
                  <p className="mb-2 font-medium text-lg text-gray-400">
                    {title}
                  </p>
                  <p className="text-xl font-bold text-gray-200">{amount}</p>
                </div>
              </div>
            </div>
    </div>
  )
}

export default StatisticCard