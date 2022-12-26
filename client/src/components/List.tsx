import { useState, useEffect } from "react"

export default function List() {
  return (
    <div className='min-w-full overflow-scroll max-h-itemContainer flex-none relative z-0'>
        <table className='w-full'>
          <thead className='text-[#707785] text-left'>
            <tr>
              <th className='py-3 bg-[#F3F4F6] sticky pl-4 top-0'>Title</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Description</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Project Manager</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Team</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Status</th>
            </tr>
          </thead>
          <tbody className='text-left'>

          </tbody>
        </table>
      </div>
  )
}
